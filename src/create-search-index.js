// MIT © 2017 azu
"use strict";
const apiList = require("./api-index.json");
// $, $W
const createUtil = (api) => {
    return [
        `call[callee=#${api.name}]`
    ]
};
// class method
const createClassMethods = (api, aggressive) => {
    const aggressiveSearchIndex = aggressive
        ? [
            // var alias = RegExp.escape;
            `var __ = ${api.name}`,
            `let __ = ${api.name}`,
            `const __ = ${api.name}`,
            `__ = ${api.name}`,
            `__.__ = ${api.name}`,
            // arguments
            `__(${api.name})`,
            // bind
            `__(__, ${api.name})`,
        ]
        : [];
    return [
        `${api.name}()`,
        `${api.name}(__)`,
        `${api.name}(__, __)`,
        `${api.name}(__, __, __)`,
        `${api.name}(__, __, __, __)`,
    ].concat(aggressiveSearchIndex);
};
// instance method
const createInstanceMethods = (api, aggressive) => {
    const removedThisName = api.name.replace(/.*#/, "");
    const aggressiveSearchIndex = aggressive
        ? [
            // var alias = RegExp.escape;
            `var __ = ${removedThisName}`,
            `let __ = ${removedThisName}`,
            `const __ = ${removedThisName}`,
            `__ = ${removedThisName}`,
            `__.__ = ${removedThisName}`,
            `__(${removedThisName})`,
            // bind
            `__(__, ${removedThisName})`,
        ]
        : [];
    return [
        `__.${removedThisName}()`,
        `__.${removedThisName}(__)`,
        `__.${removedThisName}(__, __)`,
        `__.${removedThisName}(__, __, __)`,
        `__.${removedThisName}(__, __, __, __)`,
    ].concat(aggressiveSearchIndex);
};
// class properties
const createClassProperties = (api) => {
    return [api.name];
};
// instance properties
const createInstanceProperties = function(api) {
    const removedThisName = api.name.replace(/.*#/, "");
    return [`__.${removedThisName}`];
};
// constructor = new
const createConstructor = function(api) {
    return [`${api.name}`];
};
/**
 * create search index and return it.
 * @params {{ aggressive: boolean }} [options]
 * @returns {{ sQueries: string[], eQueries: string[], name:string }[]}
 */
const createSearchIndex = (options = {}) => {
    const aggressive = options.aggressive !== undefined ? options.aggressive : false;
    return Object.values(apiList).map(api => {
        const eQueries = ((type) => {
            switch (type) {
                case "instance method":
                    return createInstanceMethods(api, aggressive);
                case "class method":
                    return createClassMethods(api, aggressive);
                case "constant":
                case "class property":
                    return createClassProperties(api);
                case "instance property":
                    return createInstanceProperties(api);
                case "constructor":
                    return createConstructor(api);
                case "class":
                case "utility":
                // https://github.com/gkz/grasp/issues/72 squery doesn't work
                case "section":
                case "mixin":
                case "namespace":
                    return [];
                default:
                    throw new Error(type);
            }
        })(api.type);
        const sQueries = (api.type === "utility") ? createUtil(api) : null;
        return Object.assign({}, api, {
            eQueries: eQueries,
            sQueries: sQueries
        });
    });
};
module.exports.createSearchIndex = createSearchIndex;