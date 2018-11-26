/**
 * @fileoverview Tests for camelcase rule
 * @author Guy Lilian
 * @author Shahar Or
 * @author Patricio Trevino
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const ruleCamelcase = require("../../../lib/rules/camelcase");
const RuleTester = require("eslint").RuleTester;

const ruleTester = new RuleTester({
    parser: "typescript-eslint-parser"
});

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

ruleTester.run("camelcase", ruleCamelcase, {
    valid: [
        {
            code: "interface Foo { b_ar: null }",
            options: [{ properties: "never" }]
        },
        {
            code: "interface Foo { bar: null }",
            options: [{ properties: "always" }]
        }
    ],

    invalid: [
        {
            code: "interface Foo { b_ar: null }",
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
