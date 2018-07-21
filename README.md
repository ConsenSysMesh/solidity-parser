[![npm](https://img.shields.io/npm/v/solidity-parser.svg)]()
[![npm](https://img.shields.io/npm/dm/solidity-parser.svg)]()
[![Build Status](https://travis-ci.org/ConsenSys/solidity-parser.svg?branch=master)](https://travis-ci.org/ConsenSys/solidity-parser)

## ⚠️  DEPRECATION NOTICE ⚠️

This library is not being maintained anymore. For an up-to-date Solidity parser, check out [solidity-parser-antlr](https://github.com/federicobond/solidity-parser-antlr).

# Solidity Parser

A Solidity parser in Javascript. So we can evaluate and alter Solidity code without resorting to cruddy preprocessing.  

### Usage

**Library**

```
npm install solidity-parser
```

Then, in your code:

```javascript
var SolidityParser = require("solidity-parser");

// Parse Solidity code as a string:
var result = SolidityParser.parse("contract { ... }");

// Or, parse a file:
var result = SolidityParser.parseFile("./path/to/file.sol");
```

You can also parse a file specifically for its imports. This won't return an abstract syntax tree, but will instead return a list of files required by the parsed file:

```javascript

var SolidityParser = require("solidity-parser");

var result = SolidityParser.parseFile("./path/to/file.sol", "imports");

console.log(result);
// [
//   "SomeFile.sol",
//   "AnotherFile.sol"
// ]
```

**Command Line** (for convenience)

```
$ solidity-parser ./path/to/file.js
```

### Results

Consider this solidity code as input:

```
import "Foo.sol";

contract MyContract {
  mapping (uint => address) public addresses;
}
```

You'll receiving the following (or something very similar) as output. Note that the structure of mappings could be made more clear, and this will likely be changed in the future.

```json
{
  "type": "Program",
  "body": [
    {
      "type": "ImportStatement",
      "value": "Foo.sol"
    },
    {
      "type": "ContractStatement",
      "name": "MyContract",
      "is": [],
      "body": [
        {
          "type": "ExpressionStatement",
          "expression": {
            "type": "DeclarativeExpression",
            "name": "addresses",
            "literal": {
              "type": "Type",
              "literal": {
                "type": "MappingExpression",
                "from": {
                  "type": "Type",
                  "literal": "uint",
                  "members": [],
                  "array_parts": []
                },
                "to": {
                  "type": "Type",
                  "literal": "address",
                  "members": [],
                  "array_parts": []
                }
              },
              "members": [],
              "array_parts": []
            },
            "is_constant": false,
            "is_public": true
          }
        }
      ]
    }
  ]
}
```

### Test

In a checkout of the project, run:

```
$ npm test
```

### License

MIT
