# search-prototype.js

Search usage of prototype.js in your codes.

We can found the code that use [Prototype.js](http://prototypejs.org/ "Prototype").

This tool is based on [grasp](http://www.graspjs.com/ "grasp") that can search the code by AST.
It can search the code exactly.

## Search prototype.js API

This tool use [prototype.js's API reference](http://api.prototypejs.org/) as search index.

- <http://api.prototypejs.org/javascripts/pdoc/item_index.js>

This tool can found the prototype.js extensible API like `Function#curry` in your code.

## Install

Install with [npm](https://www.npmjs.com/):

    npm install search-prototype.js

## Usage

    Usage
      $ search-prototype.js <file-path>

    Examples
      $ search-prototype.js ./your.js
      
## Example

```
> search-prototype.js test/search-prototype-test.js

# Found "call[callee=#$]"
2:    var item = $('sample');
# Found "call[callee=#$]"
7:$("test");
# Found "__.getHeight(__)"
3:    var ret = Element.getHeight(item);
# Found "Element.getHeight(__)"
3:    var ret = Element.getHeight(item);
# Found "var __ = Class.create"
9:var cc = Class.create;

```

## Changelog

See [Releases page](https://github.com/azu/search-prototype.js/releases).

## Running tests

Install devDependencies and Run `npm test`:

    npm i -d && npm test

## Contributing

Pull requests and stars are always welcome.

For bugs and feature requests, [please create an issue](https://github.com/azu/search-prototype.js/issues).

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Author

- [github/azu](https://github.com/azu)
- [twitter/azu_re](https://twitter.com/azu_re)

## License

MIT © azu
