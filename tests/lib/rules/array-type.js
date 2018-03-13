/**
 * @fileoverview Requires using either 'T[]' or 'Array' for arrays.
 * @author Mackie Underdown
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/array-type"),
    RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const arrayMessage =
    "Array type using 'Array<T>' is forbidden. Use 'T[]' instead.";
const genericMessage =
    "Array type using 'T[]' is forbidden. Use 'Array<T>' instead.";

const ruleTester = new RuleTester({
    parser: "typescript-eslint-parser"
});

ruleTester.run("array-type", rule, {
    valid: [
        {
            code: "let a: string[] = []",
            options: ["array"]
        },
        {
            code: "let a: (string | number)[] = []",
            options: ["array"]
        },
        {
            code: "let a: ({ foo: Bar[] })[] = []",
            options: ["array"]
        },
        {
            code: "let a: Array<string> = []",
            options: ["generic"]
        },
        {
            code: "let a: Array<string| number> = []",
            options: ["generic"]
        },
        {
            code: "let a: Array<{ foo: Array<Bar> }> = []",
            options: ["generic"]
        }
    ],
    invalid: [
        {
            code: "let a: Array<string> = []",
            options: ["array"],
            errors: [
                {
                    message: arrayMessage,
                    line: 1,
                    column: 8
                }
            ]
        },
        {
            code: "let a: Array<string | number> = []",
            options: ["array"],
            errors: [
                {
                    message: arrayMessage,
                    line: 1,
                    column: 8
                }
            ]
        },
        {
            code: "let a: ({ foo: Array<Bar> })[] = []",
            options: ["array"],
            errors: [
                {
                    message: arrayMessage,
                    line: 1,
                    column: 8
                }
            ]
        },
        {
            code: "let a: string[] = []",
            options: ["generic"],
            errors: [
                {
                    message: genericMessage,
                    line: 1,
                    column: 8
                }
            ]
        },
        {
            code: "let a: (string | number)[] = []",
            options: ["generic"],
            errors: [
                {
                    message: genericMessage,
                    line: 1,
                    column: 8
                }
            ]
        },
        {
            code: "let a: Array<{ foo: Bar[] }> = []",
            options: ["generic"],
            errors: [
                {
                    message: genericMessage,
                    line: 1,
                    column: 8
                }
            ]
        }
    ]
});
