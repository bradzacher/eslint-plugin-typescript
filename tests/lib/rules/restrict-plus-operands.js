/**
 * @fileoverview When adding two variables, operands must both be of type number or of type string.
 * @author James Henry
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/restrict-plus-operands"),
    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("restrict-plus-operands", rule, {

    valid: [
        {
            code: "var foo = 1 + 1;",
            parser: "typescript-eslint-parser"
        },
        {
            code: "var foo = '1' + '1';",
            parser: "typescript-eslint-parser"
        },
    ],

    invalid: [
        {
            code: "var foo = '1' + 1;",
            parser: "typescript-eslint-parser",
            errors: [{
                message: "Cannot add a 'string' to a 'number'.",
                line: 1,
                column: 11
            }]
        },
        {
            code: "var foo = [] + {};",
            parser: "typescript-eslint-parser",
            errors: [{
                message: "'{}' is not a supported type for addition.",
                line: 1,
                column: 11
            }]
        }
    ]
});
