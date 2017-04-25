#!/usr/bin/env node
'use strict';
const meow = require('meow');
const searchPrototype = require("../src/search-prototype");

const cli = meow(`
    Usage
      $ search-prototype.js <file-path>

    Examples
      $ search-prototype.js ./your.js
`);
/*
 {
 input: ['unicorns'],
 flags: {rainbow: true},
 ...
 }
 */
if(cli.input.length === 0) {
    cli.showHelp(1);
}
searchPrototype(cli.input[0], cli.flags);