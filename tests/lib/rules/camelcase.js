/**
 * @fileoverview Tests for camelcase rule
 * @author Guy Lilian & Shahar Or
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const ruleCamelcase = require("eslint/lib/rules/camelcase");
const RuleTester = require("eslint").RuleTester;

const parser = "typescript-eslint-parser";

const ruleTester = new RuleTester();

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

ruleTester.run("camelcase", ruleCamelcase, {
    valid: [
        {
            code: "interface Foo { b_ar: null }",
            parser,
            options: [{ properties: "never" }]
        }
    ],

    invalid: [
        {
            code: "interface Foo { b_ar: null }",
            parser,
            options: [{ properties: "always" }],
            errors: [
                {
                    message: "Identifier 'b_ar' is not in camel case.",
                    line: 1,
                    column: 17
                }
            ]
        }
    ]
});
