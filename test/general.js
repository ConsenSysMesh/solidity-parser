var SolidityParser = require('../index.js');

describe("Parser", function() {
  it("parses documentation examples without throwing an error", function(done) {
    SolidityParser.parseFile("./test/doc_examples.sol");
    done();
  });
});
