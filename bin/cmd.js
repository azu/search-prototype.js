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

searchPrototype(cli.input[0], cli.flags);