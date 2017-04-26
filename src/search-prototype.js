// MIT © 2017 azu
"use strict";
const grasp = require("grasp");
const path = require("path");
const searchIndex = require("./create-search-index").createSearchIndex({
    aggressive: true
});

const mockConsole = {
    log: console.log.bind(console),
    warn: console.warn.bind(console),
    error: (error) => {
        // supress error
        // TODO: Cannot read property 'type' of null
    },
    time: console.time.bind(console),
    timeEnd: console.timeEnd.bind(console),
};
const runGrasp = ({ queryType, query, filePath }, callback) => {
    const type = queryType === "squery" ? "-s" : "-e";
    const argv = ["node", "bin-path", type, query, filePath];
    grasp({
        args: argv,
        exit: (status) => {
            callback(status);
        },
        stdin: process.stdin,
        console: mockConsole,
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