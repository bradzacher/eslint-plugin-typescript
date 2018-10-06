/**
 * @fileoverview Enforces spacing around type annotations
 * @author Nicholas C. Zakas
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/space-infix-ops"),
    RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
    parser: "typescript-eslint-parser"
});

ruleTester.run("space-infix-ops", rule, {
    valid: ["type Foo = string;", "type Foo<T> = T;"],
    invalid: [
        {
            code: "type Foo=number;",
            errors: [
                {
                    message: "Infix operators must be spaced.",
                    line: 1,
                    column: 9
                }
            ]
        },
        {
            code: "type Foo =number;",
            errors: [
                {
                    message: "Infix operators must be spaced.",
                    line: 1,
                    column: 10
                }
            ]
        },
        {
            code: "type Foo= number;",
            errors: [
                {
                    message: "Infix operators must be spaced.",
                    line: 1,
                    column: 9
                }
            ]
        },
        {
            code: "type Foo<T>=T;",
            errors: [
                {
                    message: "Infix operators must be spaced.",
                    line: 1,
                    column: 12
                }
            ]
        },
        {
            code: "type Foo<T> =T;",
            errors: [
                {
                    message: "Infix operators must be spaced.",
                    line: 1,
                    column: 13
                }
            ]
        },
        {
            code: "type Foo<T>= T;",
            errors: [
                {
                    message: "Infix operators must be spaced.",
                    line: 1,
                    column: 12
                }
            ]
        }
    ]
});
