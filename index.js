var PEG = require("pegjs");
var fs = require("fs");
var path = require("path");

var parser = null;

// TODO: Make all this async.
module.exports = {
  buildParser: function() {
    if (parser == null) {
      var parserfile = fs.readFileSync(path.resolve("./solidity.pegjs"), {encoding: "utf8"});
      var parser = PEG.buildParser(parserfile);
    }
    return parser;
  },
  parse: function(source) {
    var parser = this.buildParser();
    return parser.parse(source);
  },
  parseFile: function(file) {
    return this.parse(fs.readFileSync(path.resolve(file), {encoding: "utf8"}));
  }
};
