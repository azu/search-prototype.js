// MIT © 2017 azu
"use strict";
const grasp = require("grasp");
const path = require("path");
const searchIndex = require("./create-search-index").createSearchIndex({
    aggressive: true
});
const runGrasp = ({ queryType, query, filePath }, callback) => {
    const type = queryType === "squery" ? "-s" : "-e";
    const argv = ["node", "bin-path", type, query, filePath];
    grasp({
        args: argv,
        exit: (status) => {
            callback(status);
        },
        stdin: process.stdin,
        fs: require('fs'),
        callback: (...args) => {
            console.log(`# Found "${query}"`);
            console.log(...args);
        },
        error: console.error
    });
};
//
module.exports = function searchPrototypeJS(filePath) {
    filePath = path.resolve(process.cwd(), filePath);
    searchIndex.forEach(result => {
        const eQueries = result.eQueries || [];
        eQueries.forEach(query => {
            runGrasp({
                queryType: "equery",
                query,
                filePath
            }, () => {

            });
        });
        const sQueries = result.sQueries || [];
        sQueries.forEach(query => {
            runGrasp({
                queryType: "squery",
                query,
                filePath
            }, () => {

            });
        });
    });
};