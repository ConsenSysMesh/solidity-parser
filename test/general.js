var SolidityParser = require('../index.js');

describe("Parser", function() {
  it("parses documentation examples without throwing an error", function(done) {
    var result = SolidityParser.parseFile("./test/doc_examples.sol", true);
    //console.log(JSON.stringify(result, null, 2));
    done();
  });
});
