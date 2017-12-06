/**
 * @fileoverview Tests for no-unreachable rule.
 * @author Shahar Or
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("eslint/lib/rules/no-unreachable"),
    RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();

ruleTester.run("no-unreachable", rule, {
    valid: [
        {
            code: `
namespace foo {
    function bar() {
        return;
    }
}
console.log('reachable!')
            `,
            parser: "typescript-eslint-parser"
        }
    ],
    invalid: [
        {
            code: "function foo() { return x; var x = 1; }",
            errors: [
                { message: "Unreachable code.", type: "VariableDeclaration" }
            ]
        }
    ]
});
