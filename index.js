var PEG = require("pegjs");
var fs = require("fs");
var path = require("path");

var builtParsers = {
  "solidity": require("./build/parser"),
  "solidity_imports": require("./build/imports_parser")
};

var parser = null;

// TODO: Make all this async.
module.exports = {
  buildParser: function(parser_name, rebuild) {
    if (parser == null) {
      if (rebuild == true) {
        var parserfile = fs.readFileSync(path.resolve("./" + parser_name + ".pegjs"), {encoding: "utf8"});
        return PEG.buildParser(parserfile);
      }
      return builtSolidityParser;
    }
    return parser;
  },
  parse: function(source, parser_name, rebuild) {
    if (typeof parser_name == "boolean") {
      rebuild = parser_name;
      parser_name = null;
    }

    if (parser_name == null) {
      parser_name = "solidity";
    }

    var parser = this.buildParser(parser_name, rebuild);

    var result;
    try {
      result = parser.parse(source);
    } catch (e) {
      if (e instanceof parser.SyntaxError) {
        e.message += " Line: " + e.location.start.line + ", Column: " + e.location.start.column;
      }
      throw e;
    }

    return result;
  },
  parseFile: function(file, parser_name, rebuild) {
    return this.parse(fs.readFileSync(path.resolve(file), {encoding: "utf8"}), parser_name, rebuild);
  }
};
