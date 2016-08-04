# solparse
Parse Solidity Code into Spider Monkey API compliant AST

This is a (much more) refined version of [solidity-parser](https://github.com/ConsenSys/solidity-parser). 
I've fixed a lot of bugs (see below) and added features as per solidity grammar spec (but obviously its not perfect a.t.m.). I plan to maintain it long-term =)

#List of bugs in solidity-parser (as of this writing)

1. No 'name' field in StructDeclaration - this means we never get to know the name of the struct from the StructDeclaration Node object. (**I made a PR for this but no response even after 2 weeks :(**)

3. IsStatement malfunctioning - When using inheritance with Contract or Library, the syntax is:

```
contract Car is Vehicle, Engine {
        //definition
}
```

Solidity parser doesn't parse the 'is' section properly. the is Array's first object is fine (vehicle), but subsequent element is just a comma, not another object for Engine.

4. Exponentiation operator (double asterisk) not being parsed by solidity parser

5. A statement like ```uint x = 2 days;``` doesn't get parsed. It gives error at start of 'days'. (though SP parses the other tokens: "2 wei / 2 szabo / 2 finny, etc.", "days" is a valid suffix too but doesn't have support.

6. Parse of ```var (x) = 100;``` failing because x is surrounded by brackets (which is legal in solidity).

All these bugs have been fixed in solparse!
If you find a bug or a missing feature in this parser, please open up an issue :)
