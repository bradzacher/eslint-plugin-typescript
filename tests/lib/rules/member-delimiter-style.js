/**
 * @fileoverview Enforces a member delimiter style in interfaces and type literals.
 * @author Patricio Trevino
 * @author Brad Zacher
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/member-delimiter-style"),
    RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
    parser: "typescript-eslint-parser",
});

const errors = rule.errorMessages;

ruleTester.run("member-delimiter-style", rule, {
    valid: [
        {
            code: `
interface Foo {
    name: string;
    age: number;
}
                `,
        },
        {
            code: `
interface Foo {
    name: string;
    age: number;
}
                    `,
            options: [{ delimiter: "semi", requireLast: true }],
        },
        {
            code: `
interface Foo {
    name: string;
    age: number;
}
                    `,
            options: [{ delimiter: "semi" }],
        },
        {
            code: `
interface Foo {
    name: string;
    age: number
}
                    `,
            options: [{ delimiter: "semi", requireLast: false }],
        },
        {
            code: `
interface Foo {
    name: string,
    age: number,
}
                    `,
            options: [{ delimiter: "comma", requireLast: true }],
        },
        {
            code: `
interface Foo {
    name: string,
    age: number,
}
                    `,
            options: [{ delimiter: "comma" }],
        },
        {
            code: `
interface Foo {
    name: string,
    age: number
}
                    `,
            options: [{ delimiter: "comma", requireLast: false }],
        },
        {
            code: `
interface Foo {
    name: string
    age: number
}
                    `,
            options: [{ delimiter: "none", requireLast: true }],
        },
        {
            code: `
interface Foo {
    name: string
    age: number
}
                    `,
            options: [{ delimiter: "none", requireLast: false }],
        },
        {
            code: `
interface Foo {
    name: string;
    age: number;
}
                    `,
            options: [
                {
                    delimiter: "comma",
                    requireLast: false,
                    overrides: {
                        interface: {
                            delimiter: "semi",
                            requireLast: true,
                        },
                    },
                },
            ],
        },
        {
            code: `
interface Foo {
    name: string;
    age: number;
}
                    `,
            options: [
                {
                    delimiter: "comma",
                    overrides: { interface: { delimiter: "semi" } },
                },
            ],
        },
        {
            code: `
interface Foo {
    name: string;
    age: number
}
                    `,
            options: [
                {
                    delimiter: "comma",
                    requireLast: true,
                    overrides: {
                        interface: {
                            delimiter: "semi",
                            requireLast: false,
                        },
                    },
                },
            ],
        },
        {
            code: `
interface Foo {
    name: string,
    age: number,
}
                    `,
            options: [
                {
                    delimiter: "semi",
                    requireLast: false,
                    overrides: {
                        interface: {
                            delimiter: "comma",
                            requireLast: true,
                        },
                    },
                },
            ],
        },
        {
            code: `
interface Foo {
    name: string,
    age: number,
}
                    `,
            options: [
                {
                    delimiter: "semi",
                    overrides: { interface: { delimiter: "comma" } },
                },
            ],
        },
        {
            code: `
interface Foo {
    name: string,
    age: number
}
                    `,
            options: [
                {
                    delimiter: "semi",
                    requireLast: true,
                    overrides: {
                        interface: {
                            delimiter: "comma",
                            requireLast: false,
                        },
                    },
                },
            ],
        },
        {
            code: `
interface Foo {
    name: string
    age: number
}
                    `,
            options: [
                {
                    delimiter: "semi",
                    requireLast: false,
                    overrides: {
                        interface: { delimiter: "none", requireLast: true },
                    },
                },
            ],
        },
        {
            code: `
interface Foo {
    name: string
    age: number
}
                    `,
            options: [
                {
                    delimiter: "semi",
                    requireLast: true,
                    overrides: {
                        interface: { delimiter: "none", requireLast: false },
                    },
                },
            ],
        },
        {
            code: `
type Foo = {
    name: string;
    age: number;
}
                    `,
        },
        {
            code: `
type Foo = {
    name: string;
    age: number;
}
                    `,
            options: [{ delimiter: "semi", requireLast: true }],
        },
        {
            code: `
type Foo = {
    name: string;
    age: number;
}
                    `,
            options: [{ delimiter: "semi" }],
        },
        {
            code: `
type Foo = {
    name: string;
    age: number
}
                    `,
            options: [{ delimiter: "semi", requireLast: false }],
        },
        {
            code: `
type Foo = {
    name: string,
    age: number,
}
                    `,
            options: [{ delimiter: "comma", requireLast: true }],
        },
        {
            code: `
type Foo = {
    name: string,
    age: number,
}
                    `,
            options: [{ delimiter: "comma" }],
        },
        {
            code: `
type Foo = {
    name: string,
    age: number
}
                    `,
            options: [{ delimiter: "comma", requireLast: false }],
        },
        {
            code: `
type Foo = {
    name: string
    age: number
}
                    `,
            options: [{ delimiter: "none", requireLast: true }],
        },
        {
            code: `
type Foo = {
    name: string
    age: number
}
                    `,
            options: [{ delimiter: "none", requireLast: false }],
        },
        {
            code: `
type Foo = {
    name: string;
    age: number;
}
                    `,
            options: [
                {
                    delimiter: "comma",
                    requireLast: false,
                    overrides: {
                        typeLiteral: { delimiter: "semi", requireLast: true },
                    },
                },
            ],
        },
        {
            code: `
type Foo = {
    name: string;
    age: number;
}
                    `,
            options: [
                {
                    delimiter: "comma",
                    overrides: { typeLiteral: { delimiter: "semi" } },
                },
            ],
        },
        {
            code: `
type Foo = {
    name: string;
    age: number
}
                    `,
            options: [
                {
                    delimiter: "comma",
                    requireLast: true,
                    overrides: {
                        typeLiteral: { delimiter: "semi", requireLast: false },
                    },
                },
            ],
        },
        {
            code: `
type Foo = {
    name: string,
    age: number,
}
                    `,
            options: [
                {
                    delimiter: "semi",
                    requireLast: false,
                    overrides: {
                        typeLiteral: { delimiter: "comma", requireLast: true },
                    },
                },
            ],
        },
        {
            code: `
type Foo = {
    name: string,
    age: number,
}
                    `,
            options: [
                {
                    delimiter: "semi",
                    overrides: { typeLiteral: { delimiter: "comma" } },
                },
            ],
        },
        {
            code: `
type Foo = {
    name: string,
    age: number
}
                    `,
            options: [
                {
                    delimiter: "semi",
                    requireLast: false,
                    overrides: {
                        typeLiteral: { delimiter: "comma", requireLast: false },
                    },
                },
            ],
        },
        {
            code: `
type Foo = {
    name: string
    age: number
}
                    `,
            options: [
                {
                    delimiter: "semi",
                    requireLast: false,
                    overrides: {
                        typeLiteral: { delimiter: "none", requireLast: true },
                    },
                },
            ],
        },
        {
            code: `
type Foo = {
    name: string
    age: number
}
                    `,
            options: [
                {
                    delimiter: "semi",
                    requireLast: true,
                    overrides: {
                        typeLiteral: { delimiter: "none", requireLast: false },
                    },
                },
            ],
        },
        {
            code: `
interface Foo {
    name: string;
    age: number;
}

type Bar = {
    name: string,
    age: number,
}
                    `,
            options: [
                {
                    delimiter: "none",
                    overrides: {
                        interface: { delimiter: "semi" },
                        typeLiteral: { delimiter: "comma" },
                    },
                },
            ],
        },
        {
            code: "interface Foo { [key: string]: any; }",
        },
        {
            code: "interface Foo { [key: string]: any }",
            options: [
                {
                    singleLine: "none",
                },
            ],
        },
        {
            code: "interface Foo { [key: string]: any }",
            options: [
                {
                    delimiter: "comma",
                    singleLine: "none",
                },
            ],
        },
        {
            code: "interface Foo { [key: string]: any; }",
            options: [
                {
                    singleLine: "semi",
                },
            ],
        },
        {
            code: "interface Foo { [key: string]: any, }",
            options: [
                {
                    delimiter: "comma",
                    singleLine: "comma",
                },
            ],
        },
        {
            code: "interface Foo { [key: string]: any }",
            options: [
                {
                    singleLine: "semi",
                    overrides: {
                        interface: { singleLine: "none" },
                    },
                },
            ],
        },
        {
            code: "interface Foo { [key: string]: any }",
            options: [
                {
                    requireLast: true,
                    singleLine: "none",
                },
            ],
        },
        {
            code: "interface Foo { [key: string]: any; }",
            options: [
                {
                    requireLast: true,
                    singleLine: "semi",
                },
            ],
        },
        {
            code: "interface Foo { [key: string]: any }",
            options: [
                {
                    requireLast: true,
                    singleLine: "semi",
                    overrides: {
                        interface: { singleLine: "none" },
                    },
                },
            ],
        },
        {
            code: "type Foo = { [key: string]: any; }",
        },
        {
            code: "type Foo = { [key: string]: any }",
            options: [
                {
                    singleLine: "none",
                },
            ],
        },
        {
            code: "type Foo = { [key: string]: any; }",
            options: [
                {
                    singleLine: "semi",
                },
            ],
        },
        {
            code: "type Foo = { [key: string]: any }",
            options: [
                {
                    singleLine: "semi",
                    overrides: {
                        typeLiteral: { singleLine: "none" },
                    },
                },
            ],
        },
        {
            code: "type Foo = { [key: string]: any }",
            options: [
                {
                    requireLast: true,
                    singleLine: "none",
                },
            ],
        },
        {
            code: "type Foo = { [key: string]: any; }",
            options: [
                {
                    requireLast: true,
                    singleLine: "semi",
                },
            ],
        },
        {
            code: "type Foo = { [key: string]: any }",
            options: [
                {
                    requireLast: true,
                    singleLine: "semi",
                    overrides: {
                        typeLiteral: { singleLine: "none" },
                    },
                },
            ],
        },
        {
            code: `
interface Foo {
    name: string;
    age: number;
}

interface Bar { name: string }
                `,
            options: [
                {
                    delimiter: "semi",
                    requireLast: true,
                    singleLine: "none",
                },
            ],
        },
        {
            code: `
interface Foo {
    name: string;
    age: number;
}

type Bar = { name: string }
                `,
            options: [
                {
                    delimiter: "semi",
                    requireLast: true,
                    singleLine: "semi",
                    overrides: {
                        typeLiteral: { singleLine: "none" },
                    },
                },
            ],
        },
    ],
    invalid: [
        {
            code: `
interface Foo {
    name: string
    age: number
}
            `,
            output: `
interface Foo {
    name: string;
    age: number;
}
            `,
            errors: [
                {
                    message: errors.expected.semi,
                    line: 3,
                    column: 17,
                },
                {
                    message: errors.expected.semi,
                    line: 4,
                    column: 16,
                },
            ],
        },
        {
            code: `
interface Foo {
    name: string
    age: number
}
            `,
            output: `
interface Foo {
    name: string;
    age: number;
}
            `,
            options: [{ delimiter: "semi" }],
            errors: [
                {
                    message: errors.expected.semi,
                    line: 3,
                    column: 17,
                },
                {
                    message: errors.expected.semi,
                    line: 4,
                    column: 16,
                },
            ],
        },
        {
            code: `
interface Foo {
    name: string
    age: number
}
            `,
            output: `
interface Foo {
    name: string;
    age: number;
}
            `,
            options: [{ delimiter: "semi", requireLast: true }],
            errors: [
                {
                    message: errors.expected.semi,
                    line: 3,
                    column: 17,
                },
                {
                    message: errors.expected.semi,
                    line: 4,
                    column: 16,
                },
            ],
        },
        {
            code: `
interface Foo {
    name: string
    age: number
}
            `,
            output: `
interface Foo {
    name: string;
    age: number
}
            `,
            options: [{ delimiter: "semi", requireLast: false }],
            errors: [
                {
                    message: errors.expected.semi,
                    line: 3,
                    column: 17,
                },
            ],
        },
        {
            code: `
interface Foo {
    name: string;
    age: number
}
            `,
            output: `
interface Foo {
    name: string;
    age: number;
}
            `,
            options: [{ delimiter: "semi", requireLast: true }],
            errors: [
                {
                    message: errors.expected.semi,
                    line: 4,
                    column: 16,
                },
            ],
        },
        {
            code: `
interface Foo {
    name: string
    age: number
}
            `,
            output: `
interface Foo {
    name: string,
    age: number,
}
            `,
            options: [{ delimiter: "comma" }],
            errors: [
                {
                    message: errors.expected.comma,
                    line: 3,
                    column: 17,
                },
                {
                    message: errors.expected.comma,
                    line: 4,
                    column: 16,
                },
            ],
        },
        {
            code: `
interface Foo {
    name: string
    age: number
}
            `,
            output: `
interface Foo {
    name: string,
    age: number,
}
            `,
            options: [{ delimiter: "comma", requireLast: true }],
            errors: [
                {
                    message: errors.expected.comma,
                    line: 3,
                    column: 17,
                },
                {
                    message: errors.expected.comma,
                    line: 4,
                    column: 16,
                },
            ],
        },
        {
            code: `
interface Foo {
    name: string
    age: number
}
            `,
            output: `
interface Foo {
    name: string,
    age: number
}
            `,
            options: [{ delimiter: "comma", requireLast: false }],
            errors: [
                {
                    message: errors.expected.comma,
                    line: 3,
                    column: 17,
                },
            ],
        },
        {
            code: `
interface Foo {
    name: string;
    age: number;
}
            `,
            output: `
interface Foo {
    name: string,
    age: number,
}
            `,
            options: [{ delimiter: "comma" }],
            errors: [
                {
                    message: errors.expected.comma,
                    line: 3,
                    column: 18,
                },
                {
                    message: errors.expected.comma,
                    line: 4,
                    column: 17,
                },
            ],
        },
        {
            code: `
interface Foo {
    name: string;
    age: number;
}
            `,
            output: `
interface Foo {
    name: string,
    age: number,
}
            `,
            options: [{ delimiter: "comma", requireLast: true }],
            errors: [
                {
                    message: errors.expected.comma,
                    line: 3,
                    column: 18,
                },
                {
                    message: errors.expected.comma,
                    line: 4,
                    column: 17,
                },
            ],
        },
        {
            code: `
interface Foo {
    name: string;
    age: number
}
            `,
            output: `
interface Foo {
    name: string,
    age: number
}
            `,
            options: [{ delimiter: "comma", requireLast: false }],
            errors: [
                {
                    message: errors.expected.comma,
                    line: 3,
                    column: 18,
                },
            ],
        },
        {
            code: `
interface Foo {
    name: string
    age: number;
}
            `,
            output: `
interface Foo {
    name: string,
    age: number
}
            `,
            options: [{ delimiter: "comma", requireLast: false }],
            errors: [
                {
                    message: errors.expected.comma,
                    line: 3,
                    column: 17,
                },
                {
                    message: errors.unexpected.semi,
                    line: 4,
                    column: 17,
                },
            ],
        },
        {
            code: `
interface Foo {
    name: string;
    age: number;
}
            `,
            output: `
interface Foo {
    name: string
    age: number
}
            `,
            options: [{ delimiter: "none" }],
            errors: [
                {
                    message: errors.unexpected.semi,
                    line: 3,
                    column: 18,
                },
                {
                    message: errors.unexpected.semi,
                    line: 4,
                    column: 17,
                },
            ],
        },
        {
            code: `
interface Foo {
    name: string;
    age: number;
}
            `,
            output: `
interface Foo {
    name: string
    age: number
}
            `,
            options: [{ delimiter: "none", requireLast: true }],
            errors: [
                {
                    message: errors.unexpected.semi,
                    line: 3,
                    column: 18,
                },
                {
                    message: errors.unexpected.semi,
                    line: 4,
                    column: 17,
                },
            ],
        },
        {
            code: `
interface Foo {
    name: string;
    age: number
}
            `,
            output: `
interface Foo {
    name: string
    age: number
}
            `,
            options: [{ delimiter: "none", requireLast: false }],
            errors: [
                {
                    message: errors.unexpected.semi,
                    line: 3,
                    column: 18,
                },
            ],
        },
        {
            code: `
interface Foo {
    name: string
    age: number;
}
            `,
            output: `
interface Foo {
    name: string
    age: number
}
            `,
            options: [{ delimiter: "none", requireLast: false }],
            errors: [
                {
                    message: errors.unexpected.semi,
                    line: 4,
                    column: 17,
                },
            ],
        },
        {
            code: `
interface Foo {
    name: string,
    age: number,
}
            `,
            output: `
interface Foo {
    name: string
    age: number
}
            `,
            options: [{ delimiter: "none" }],
            errors: [
                {
                    message: errors.unexpected.comma,
                    line: 3,
                    column: 18,
                },
                {
                    message: errors.unexpected.comma,
                    line: 4,
                    column: 17,
                },
            ],
        },
        {
            code: `
interface Foo {
    name: string,
    age: number,
}
            `,
            output: `
interface Foo {
    name: string
    age: number
}
            `,
            options: [{ delimiter: "none", requireLast: true }],
            errors: [
                {
                    message: errors.unexpected.comma,
                    line: 3,
                    column: 18,
                },
                {
                    message: errors.unexpected.comma,
                    line: 4,
                    column: 17,
                },
            ],
        },
        {
            code: `
interface Foo {
    name: string,
    age: number
}
            `,
            output: `
interface Foo {
    name: string
    age: number
}
            `,
            options: [{ delimiter: "none", requireLast: false }],
            errors: [
                {
                    message: errors.unexpected.comma,
                    line: 3,
                    column: 18,
                },
            ],
        },
        {
            code: `
interface Foo {
    name: string
    age: number,
}
            `,
            output: `
interface Foo {
    name: string
    age: number
}
            `,
            options: [{ delimiter: "none", requireLast: false }],
            errors: [
                {
                    message: errors.unexpected.comma,
                    line: 4,
                    column: 17,
                },
            ],
        },
        {
            code: `
interface Foo {
    name: string
    age: number
}
            `,
            output: `
interface Foo {
    name: string;
    age: number;
}
            `,
            options: [
                {
                    delimiter: "comma",
                    overrides: { interface: { delimiter: "semi" } },
                },
            ],
            errors: [
                {
                    message: errors.expected.semi,
                    line: 3,
                    column: 17,
                },
                {
                    message: errors.expected.semi,
                    line: 4,
                    column: 16,
                },
            ],
        },
        {
            code: `
interface Foo {
    name: string
    age: number
}
            `,
            output: `
interface Foo {
    name: string;
    age: number;
}
            `,
            options: [
                {
                    delimiter: "comma",
                    requireLast: false,
                    overrides: {
                        interface: { delimiter: "semi", requireLast: true },
                    },
                },
            ],
            errors: [
                {
                    message: errors.expected.semi,
                    line: 3,
                    column: 17,
                },
                {
                    message: errors.expected.semi,
                    line: 4,
                    column: 16,
                },
            ],
        },
        {
            code: `
interface Foo {
    name: string;
    age: number
}
            `,
            output: `
interface Foo {
    name: string;
    age: number;
}
            `,
            options: [
                {
                    delimiter: "comma",
                    requireLast: false,
                    overrides: {
                        interface: { delimiter: "semi", requireLast: true },
                    },
                },
            ],
            errors: [
                {
                    message: errors.expected.semi,
                    line: 4,
                    column: 16,
                },
            ],
        },
        {
            code: `
interface Foo {
    name: string
    age: number
}
            `,
            output: `
interface Foo {
    name: string,
    age: number,
}
            `,
            options: [
                {
                    delimiter: "semi",
                    overrides: { interface: { delimiter: "comma" } },
                },
            ],
            errors: [
                {
                    message: errors.expected.comma,
                    line: 3,
                    column: 17,
                },
                {
                    message: errors.expected.comma,
                    line: 4,
                    column: 16,
                },
            ],
        },
        {
            code: `
interface Foo {
    name: string
    age: number
}
            `,
            output: `
interface Foo {
    name: string,
    age: number,
}
            `,
            options: [
                {
                    delimiter: "semi",
                    requireLast: false,
                    overrides: {
                        interface: { delimiter: "comma", requireLast: true },
                    },
                },
            ],
            errors: [
                {
                    message: errors.expected.comma,
                    line: 3,
                    column: 17,
                },
                {
                    message: errors.expected.comma,
                    line: 4,
                    column: 16,
                },
            ],
        },
        {
            code: `
interface Foo {
    name: string
    age: number
}
            `,
            output: `
interface Foo {
    name: string,
    age: number
}
            `,
            options: [
                {
                    delimiter: "semi",
                    requireLast: true,
                    overrides: {
                        interface: { delimiter: "comma", requireLast: false },
                    },
                },
            ],
            errors: [
                {
                    message: errors.expected.comma,
                    line: 3,
                    column: 17,
                },
            ],
        },
        {
            code: `
interface Foo {
    name: string;
    age: number;
}
            `,
            output: `
interface Foo {
    name: string,
    age: number,
}
            `,
            options: [
                {
                    delimiter: "semi",
                    overrides: { interface: { delimiter: "comma" } },
                },
            ],
            errors: [
                {
                    message: errors.expected.comma,
                    line: 3,
                    column: 18,
                },
                {
                    message: errors.expected.comma,
                    line: 4,
                    column: 17,
                },
            ],
        },
        {
            code: `
interface Foo {
    name: string;
    age: number;
}
            `,
            output: `
interface Foo {
    name: string,
    age: number,
}
            `,
            options: [
                {
                    delimiter: "semi",
                    requireLast: false,
                    overrides: {
                        interface: { delimiter: "comma", requireLast: true },
                    },
                },
            ],
            errors: [
                {
                    message: errors.expected.comma,
                    line: 3,
                    column: 18,
                },
                {
                    message: errors.expected.comma,
                    line: 4,
                    column: 17,
                },
            ],
        },
        {
            code: `
interface Foo {
    name: string;
    age: number
}
            `,
            output: `
interface Foo {
    name: string,
    age: number
}
            `,
            options: [
                {
                    delimiter: "semi",
                    requireLast: true,
                    overrides: {
                        interface: { delimiter: "comma", requireLast: false },
                    },
                },
            ],
            errors: [
                {
                    message: errors.expected.comma,
                    line: 3,
                    column: 18,
                },
            ],
        },
        {
            code: `
interface Foo {
    name: string
    age: number;
}
            `,
            output: `
interface Foo {
    name: string,
    age: number
}
            `,
            options: [
                {
                    delimiter: "semi",
                    requireLast: true,
                    overrides: {
                        interface: { delimiter: "comma", requireLast: false },
                    },
                },
            ],
            errors: [
                {
                    message: errors.expected.comma,
                    line: 3,
                    column: 17,
                },
                {
                    message: errors.unexpected.semi,
                    line: 4,
                    column: 17,
                },
            ],
        },
        {
            code: `
interface Foo {
    name: string;
    age: number;
}
            `,
            output: `
interface Foo {
    name: string
    age: number
}
            `,
            options: [
                {
                    delimiter: "semi",
                    overrides: { interface: { delimiter: "none" } },
                },
            ],
            errors: [
                {
                    message: errors.unexpected.semi,
                    line: 3,
                    column: 18,
                },
                {
                    message: errors.unexpected.semi,
                    line: 4,
                    column: 17,
                },
            ],
        },
        {
            code: `
interface Foo {
    name: string;
    age: number;
}
            `,
            output: `
interface Foo {
    name: string
    age: number
}
            `,
            options: [
                {
                    delimiter: "semi",
                    requireLast: false,
                    overrides: {
                        interface: { delimiter: "none", requireLast: true },
                    },
                },
            ],
            errors: [
                {
                    message: errors.unexpected.semi,
                    line: 3,
                    column: 18,
                },
                {
                    message: errors.unexpected.semi,
                    line: 4,
                    column: 17,
                },
            ],
        },
        {
            code: `
interface Foo {
    name: string;
    age: number
}
            `,
            output: `
interface Foo {
    name: string
    age: number
}
            `,
            options: [
                {
                    delimiter: "semi",
                    requireLast: true,
                    overrides: {
                        interface: { delimiter: "none", requireLast: false },
                    },
                },
            ],
            errors: [
                {
                    message: errors.unexpected.semi,
                    line: 3,
                    column: 18,
                },
            ],
        },
        {
            code: `
interface Foo {
    name: string
    age: number;
}
            `,
            output: `
interface Foo {
    name: string
    age: number
}
            `,
            options: [
                {
                    delimiter: "semi",
                    requireLast: true,
                    overrides: {
                        interface: { delimiter: "none", requireLast: false },
                    },
                },
            ],
            errors: [
                {
                    message: errors.unexpected.semi,
                    line: 4,
                    column: 17,
                },
            ],
        },
        {
            code: `
interface Foo {
    name: string,
    age: number,
}
            `,
            output: `
interface Foo {
    name: string
    age: number
}
            `,
            options: [
                {
                    delimiter: "semi",
                    overrides: { interface: { delimiter: "none" } },
                },
            ],
            errors: [
                {
                    message: errors.unexpected.comma,
                    line: 3,
                    column: 18,
                },
                {
                    message: errors.unexpected.comma,
                    line: 4,
                    column: 17,
                },
            ],
        },
        {
            code: `
interface Foo {
    name: string,
    age: number,
}
            `,
            output: `
interface Foo {
    name: string
    age: number
}
            `,
            options: [
                {
                    delimiter: "semi",
                    requireLast: false,
                    overrides: {
                        interface: { delimiter: "none", requireLast: true },
                    },
                },
            ],
            errors: [
                {
                    message: errors.unexpected.comma,
                    line: 3,
                    column: 18,
                },
                {
                    message: errors.unexpected.comma,
                    line: 4,
                    column: 17,
                },
            ],
        },
        {
            code: `
interface Foo {
    name: string,
    age: number
}
            `,
            output: `
interface Foo {
    name: string
    age: number
}
            `,
            options: [
                {
                    delimiter: "semi",
                    requireLast: true,
                    overrides: {
                        interface: { delimiter: "none", requireLast: false },
                    },
                },
            ],
            errors: [
                {
                    message: errors.unexpected.comma,
                    line: 3,
                    column: 18,
                },
            ],
        },
        {
            code: `
interface Foo {
    name: string
    age: number,
}
            `,
            output: `
interface Foo {
    name: string
    age: number
}
            `,
            options: [
                {
                    delimiter: "semi",
                    requireLast: true,
                    overrides: {
                        interface: { delimiter: "none", requireLast: false },
                    },
                },
            ],
            errors: [
                {
                    message: errors.unexpected.comma,
                    line: 4,
                    column: 17,
                },
            ],
        },
        {
            code: `
type Foo = {
    name: string
    age: number
}
            `,
            output: `
type Foo = {
    name: string;
    age: number;
}
            `,
            errors: [
                {
                    message: errors.expected.semi,
                    line: 3,
                    column: 17,
                },
                {
                    message: errors.expected.semi,
                    line: 4,
                    column: 16,
                },
            ],
        },
        {
            code: `
type Foo = {
    name: string
    age: number
}
            `,
            output: `
type Foo = {
    name: string;
    age: number;
}
            `,
            options: [{ delimiter: "semi" }],
            errors: [
                {
                    message: errors.expected.semi,
                    line: 3,
                    column: 17,
                },
                {
                    message: errors.expected.semi,
                    line: 4,
                    column: 16,
                },
            ],
        },
        {
            code: `
type Foo = {
    name: string
    age: number
}
            `,
            output: `
type Foo = {
    name: string;
    age: number;
}
            `,
            options: [{ delimiter: "semi", requireLast: true }],
            errors: [
                {
                    message: errors.expected.semi,
                    line: 3,
                    column: 17,
                },
                {
                    message: errors.expected.semi,
                    line: 4,
                    column: 16,
                },
            ],
        },
        {
            code: `
type Foo = {
    name: string;
    age: number
}
            `,
            output: `
type Foo = {
    name: string;
    age: number;
}
            `,
            options: [{ delimiter: "semi", requireLast: true }],
            errors: [
                {
                    message: errors.expected.semi,
                    line: 4,
                    column: 16,
                },
            ],
        },
        {
            code: `
type Foo = {
    name: string
    age: number
}
            `,
            output: `
type Foo = {
    name: string,
    age: number,
}
            `,
            options: [{ delimiter: "comma" }],
            errors: [
                {
                    message: errors.expected.comma,
                    line: 3,
                    column: 17,
                },
                {
                    message: errors.expected.comma,
                    line: 4,
                    column: 16,
                },
            ],
        },
        {
            code: `
type Foo = {
    name: string
    age: number
}
            `,
            output: `
type Foo = {
    name: string,
    age: number,
}
            `,
            options: [{ delimiter: "comma", requireLast: true }],
            errors: [
                {
                    message: errors.expected.comma,
                    line: 3,
                    column: 17,
                },
                {
                    message: errors.expected.comma,
                    line: 4,
                    column: 16,
                },
            ],
        },
        {
            code: `
type Foo = {
    name: string
    age: number
}
            `,
            output: `
type Foo = {
    name: string,
    age: number
}
            `,
            options: [{ delimiter: "comma", requireLast: false }],
            errors: [
                {
                    message: errors.expected.comma,
                    line: 3,
                    column: 17,
                },
            ],
        },
        {
            code: `
type Foo = {
    name: string;
    age: number;
}
            `,
            output: `
type Foo = {
    name: string,
    age: number,
}
            `,
            options: [{ delimiter: "comma" }],
            errors: [
                {
                    message: errors.expected.comma,
                    line: 3,
                    column: 18,
                },
                {
                    message: errors.expected.comma,
                    line: 4,
                    column: 17,
                },
            ],
        },
        {
            code: `
type Foo = {
    name: string;
    age: number;
}
            `,
            output: `
type Foo = {
    name: string,
    age: number,
}
            `,
            options: [{ delimiter: "comma", requireLast: true }],
            errors: [
                {
                    message: errors.expected.comma,
                    line: 3,
                    column: 18,
                },
                {
                    message: errors.expected.comma,
                    line: 4,
                    column: 17,
                },
            ],
        },
        {
            code: `
type Foo = {
    name: string;
    age: number
}
            `,
            output: `
type Foo = {
    name: string,
    age: number
}
            `,
            options: [{ delimiter: "comma", requireLast: false }],
            errors: [
                {
                    message: errors.expected.comma,
                    line: 3,
                    column: 18,
                },
            ],
        },
        {
            code: `
type Foo = {
    name: string
    age: number;
}
            `,
            output: `
type Foo = {
    name: string,
    age: number
}
            `,
            options: [{ delimiter: "comma", requireLast: false }],
            errors: [
                {
                    message: errors.expected.comma,
                    line: 3,
                    column: 17,
                },
                {
                    message: errors.unexpected.semi,
                    line: 4,
                    column: 17,
                },
            ],
        },
        {
            code: `
type Foo = {
    name: string;
    age: number;
}
            `,
            output: `
type Foo = {
    name: string
    age: number
}
            `,
            options: [{ delimiter: "none" }],
            errors: [
                {
                    message: errors.unexpected.semi,
                    line: 3,
                    column: 18,
                },
                {
                    message: errors.unexpected.semi,
                    line: 4,
                    column: 17,
                },
            ],
        },
        {
            code: `
type Foo = {
    name: string;
    age: number;
}
            `,
            output: `
type Foo = {
    name: string
    age: number
}
            `,
            options: [{ delimiter: "none", requireLast: true }],
            errors: [
                {
                    message: errors.unexpected.semi,
                    line: 3,
                    column: 18,
                },
                {
                    message: errors.unexpected.semi,
                    line: 4,
                    column: 17,
                },
            ],
        },
        {
            code: `
type Foo = {
    name: string;
    age: number
}
            `,
            output: `
type Foo = {
    name: string
    age: number
}
            `,
            options: [{ delimiter: "none", requireLast: false }],
            errors: [
                {
                    message: errors.unexpected.semi,
                    line: 3,
                    column: 18,
                },
            ],
        },
        {
            code: `
type Foo = {
    name: string
    age: number;
}
            `,
            output: `
type Foo = {
    name: string
    age: number
}
            `,
            options: [{ delimiter: "none", requireLast: false }],
            errors: [
                {
                    message: errors.unexpected.semi,
                    line: 4,
                    column: 17,
                },
            ],
        },
        {
            code: `
type Foo = {
    name: string,
    age: number,
}
            `,
            output: `
type Foo = {
    name: string
    age: number
}
            `,
            options: [{ delimiter: "none" }],
            errors: [
                {
                    message: errors.unexpected.comma,
                    line: 3,
                    column: 18,
                },
                {
                    message: errors.unexpected.comma,
                    line: 4,
                    column: 17,
                },
            ],
        },
        {
            code: `
type Foo = {
    name: string,
    age: number,
}
            `,
            output: `
type Foo = {
    name: string
    age: number
}
            `,
            options: [{ delimiter: "none", requireLast: true }],
            errors: [
                {
                    message: errors.unexpected.comma,
                    line: 3,
                    column: 18,
                },
                {
                    message: errors.unexpected.comma,
                    line: 4,
                    column: 17,
                },
            ],
        },
        {
            code: `
type Foo = {
    name: string,
    age: number
}
            `,
            output: `
type Foo = {
    name: string
    age: number
}
            `,
            options: [{ delimiter: "none", requireLast: false }],
            errors: [
                {
                    message: errors.unexpected.comma,
                    line: 3,
                    column: 18,
                },
            ],
        },
        {
            code: `
type Foo = {
    name: string
    age: number,
}
            `,
            output: `
type Foo = {
    name: string
    age: number
}
            `,
            options: [{ delimiter: "none", requireLast: false }],
            errors: [
                {
                    message: errors.unexpected.comma,
                    line: 4,
                    column: 17,
                },
            ],
        },
        {
            code: `
type Foo = {
    name: string
    age: number
}
            `,
            output: `
type Foo = {
    name: string;
    age: number;
}
            `,
            options: [
                {
                    delimiter: "comma",
                    overrides: { typeLiteral: { delimiter: "semi" } },
                },
            ],
            errors: [
                {
                    message: errors.expected.semi,
                    line: 3,
                    column: 17,
                },
                {
                    message: errors.expected.semi,
                    line: 4,
                    column: 16,
                },
            ],
        },
        {
            code: `
type Foo = {
    name: string
    age: number
}
            `,
            output: `
type Foo = {
    name: string;
    age: number;
}
            `,
            options: [
                {
                    delimiter: "comma",
                    requireLast: false,
                    overrides: {
                        typeLiteral: { delimiter: "semi", requireLast: true },
                    },
                },
            ],
            errors: [
                {
                    message: errors.expected.semi,
                    line: 3,
                    column: 17,
                },
                {
                    message: errors.expected.semi,
                    line: 4,
                    column: 16,
                },
            ],
        },
        {
            code: `
type Foo = {
    name: string;
    age: number
}
            `,
            output: `
type Foo = {
    name: string;
    age: number;
}
            `,
            options: [
                {
                    delimiter: "comma",
                    requireLast: false,
                    overrides: {
                        typeLiteral: { delimiter: "semi", requireLast: true },
                    },
                },
            ],
            errors: [
                {
                    message: errors.expected.semi,
                    line: 4,
                    column: 16,
                },
            ],
        },
        {
            code: `
type Foo = {
    name: string
    age: number
}
            `,
            output: `
type Foo = {
    name: string,
    age: number,
}
            `,
            options: [
                {
                    delimiter: "semi",
                    overrides: { typeLiteral: { delimiter: "comma" } },
                },
            ],
            errors: [
                {
                    message: errors.expected.comma,
                    line: 3,
                    column: 17,
                },
                {
                    message: errors.expected.comma,
                    line: 4,
                    column: 16,
                },
            ],
        },
        {
            code: `
type Foo = {
    name: string
    age: number
}
            `,
            output: `
type Foo = {
    name: string,
    age: number,
}
            `,
            options: [
                {
                    delimiter: "semi",
                    requireLast: false,
                    overrides: {
                        typeLiteral: { delimiter: "comma", requireLast: true },
                    },
                },
            ],
            errors: [
                {
                    message: errors.expected.comma,
                    line: 3,
                    column: 17,
                },
                {
                    message: errors.expected.comma,
                    line: 4,
                    column: 16,
                },
            ],
        },
        {
            code: `
type Foo = {
    name: string
    age: number
}
            `,
            output: `
type Foo = {
    name: string,
    age: number
}
            `,
            options: [
                {
                    delimiter: "semi",
                    requireLast: true,
                    overrides: {
                        typeLiteral: { delimiter: "comma", requireLast: false },
                    },
                },
            ],
            errors: [
                {
                    message: errors.expected.comma,
                    line: 3,
                    column: 17,
                },
            ],
        },
        {
            code: `
type Foo = {
    name: string;
    age: number;
}
            `,
            output: `
type Foo = {
    name: string,
    age: number,
}
            `,
            options: [
                {
                    delimiter: "semi",
                    overrides: { typeLiteral: { delimiter: "comma" } },
                },
            ],
            errors: [
                {
                    message: errors.expected.comma,
                    line: 3,
                    column: 18,
                },
                {
                    message: errors.expected.comma,
                    line: 4,
                    column: 17,
                },
            ],
        },
        {
            code: `
type Foo = {
    name: string;
    age: number;
}
            `,
            output: `
type Foo = {
    name: string,
    age: number,
}
            `,
            options: [
                {
                    delimiter: "semi",
                    requireLast: false,
                    overrides: {
                        typeLiteral: { delimiter: "comma", requireLast: true },
                    },
                },
            ],
            errors: [
                {
                    message: errors.expected.comma,
                    line: 3,
                    column: 18,
                },
                {
                    message: errors.expected.comma,
                    line: 4,
                    column: 17,
                },
            ],
        },
        {
            code: `
type Foo = {
    name: string;
    age: number
}
            `,
            output: `
type Foo = {
    name: string,
    age: number
}
            `,
            options: [
                {
                    delimiter: "semi",
                    requireLast: true,
                    overrides: {
                        typeLiteral: { delimiter: "comma", requireLast: false },
                    },
                },
            ],
            errors: [
                {
                    message: errors.expected.comma,
                    line: 3,
                    column: 18,
                },
            ],
        },
        {
            code: `
type Foo = {
    name: string
    age: number;
}
            `,
            output: `
type Foo = {
    name: string,
    age: number
}
            `,
            options: [
                {
                    delimiter: "semi",
                    requireLast: true,
                    overrides: {
                        typeLiteral: { delimiter: "comma", requireLast: false },
                    },
                },
            ],
            errors: [
                {
                    message: errors.expected.comma,
                    line: 3,
                    column: 17,
                },
                {
                    message: errors.unexpected.semi,
                    line: 4,
                    column: 17,
                },
            ],
        },
        {
            code: `
type Foo = {
    name: string;
    age: number;
}
            `,
            output: `
type Foo = {
    name: string
    age: number
}
            `,
            options: [
                {
                    delimiter: "semi",
                    overrides: { typeLiteral: { delimiter: "none" } },
                },
            ],
            errors: [
                {
                    message: errors.unexpected.semi,
                    line: 3,
                    column: 18,
                },
                {
                    message: errors.unexpected.semi,
                    line: 4,
                    column: 17,
                },
            ],
        },
        {
            code: `
type Foo = {
    name: string;
    age: number;
}
            `,
            output: `
type Foo = {
    name: string
    age: number
}
            `,
            options: [
                {
                    delimiter: "semi",
                    requireLast: false,
                    overrides: {
                        typeLiteral: { delimiter: "none", requireLast: true },
                    },
                },
            ],
            errors: [
                {
                    message: errors.unexpected.semi,
                    line: 3,
                    column: 18,
                },
                {
                    message: errors.unexpected.semi,
                    line: 4,
                    column: 17,
                },
            ],
        },
        {
            code: `
type Foo = {
    name: string;
    age: number
}
            `,
            output: `
type Foo = {
    name: string
    age: number
}
            `,
            options: [
                {
                    delimiter: "semi",
                    requireLast: true,
                    overrides: {
                        typeLiteral: { delimiter: "none", requireLast: false },
                    },
                },
            ],
            errors: [
                {
                    message: errors.unexpected.semi,
                    line: 3,
                    column: 18,
                },
            ],
        },
        {
            code: `
type Foo = {
    name: string
    age: number;
}
            `,
            output: `
type Foo = {
    name: string
    age: number
}
            `,
            options: [
                {
                    delimiter: "semi",
                    requireLast: true,
                    overrides: {
                        typeLiteral: { delimiter: "none", requireLast: false },
                    },
                },
            ],
            errors: [
                {
                    message: errors.unexpected.semi,
                    line: 4,
                    column: 17,
                },
            ],
        },
        {
            code: `
type Foo = {
    name: string,
    age: number,
}
            `,
            output: `
type Foo = {
    name: string
    age: number
}
            `,
            options: [
                {
                    delimiter: "comma",
                    overrides: { typeLiteral: { delimiter: "none" } },
                },
            ],
            errors: [
                {
                    message: errors.unexpected.comma,
                    line: 3,
                    column: 18,
                },
                {
                    message: errors.unexpected.comma,
                    line: 4,
                    column: 17,
                },
            ],
        },
        {
            code: `
type Foo = {
    name: string,
    age: number,
}
            `,
            output: `
type Foo = {
    name: string
    age: number
}
            `,
            options: [
                {
                    delimiter: "comma",
                    requireLast: false,
                    overrides: {
                        typeLiteral: { delimiter: "none", requireLast: true },
                    },
                },
            ],
            errors: [
                {
                    message: errors.unexpected.comma,
                    line: 3,
                    column: 18,
                },
                {
                    message: errors.unexpected.comma,
                    line: 4,
                    column: 17,
                },
            ],
        },
        {
            code: `
type Foo = {
    name: string,
    age: number
}
            `,
            output: `
type Foo = {
    name: string
    age: number
}
            `,
            options: [
                {
                    delimiter: "comma",
                    requireLast: true,
                    overrides: {
                        typeLiteral: { delimiter: "none", requireLast: false },
                    },
                },
            ],
            errors: [
                {
                    message: errors.unexpected.comma,
                    line: 3,
                    column: 18,
                },
            ],
        },
        {
            code: `
type Foo = {
    name: string
    age: number,
}
            `,
            output: `
type Foo = {
    name: string
    age: number
}
            `,
            options: [
                {
                    delimiter: "comma",
                    requireLast: true,
                    overrides: {
                        typeLiteral: { delimiter: "none", requireLast: false },
                    },
                },
            ],
            errors: [
                {
                    message: errors.unexpected.comma,
                    line: 4,
                    column: 17,
                },
            ],
        },
        {
            code: `
interface Foo {
    name: string;
    age: number;
}

type Bar = {
    name: string,
    age: number,
}
            `,
            output: `
interface Foo {
    name: string,
    age: number,
}

type Bar = {
    name: string;
    age: number;
}
            `,
            options: [
                {
                    delimiter: "none",
                    requireLast: true,
                    overrides: {
                        interface: { delimiter: "comma" },
                        typeLiteral: { delimiter: "semi" },
                    },
                },
            ],
            errors: [
                {
                    message: errors.expected.comma,
                    line: 3,
                    column: 18,
                },
                {
                    message: errors.expected.comma,
                    line: 4,
                    column: 17,
                },
                {
                    message: errors.expected.semi,
                    line: 8,
                    column: 18,
                },
                {
                    message: errors.expected.semi,
                    line: 9,
                    column: 17,
                },
            ],
        },
        {
            code: `
interface Foo {
    [key: string]: any
}
            `,
            output: `
interface Foo {
    [key: string]: any;
}
            `,
            errors: [
                {
                    message: errors.expected.semi,
                    line: 3,
                    column: 23,
                },
            ],
        },
        {
            code: `
interface Foo {
    [key: string]: any
}
            `,
            output: `
interface Foo {
    [key: string]: any;
}
            `,
            options: [{ singleLine: "none" }],
            errors: [
                {
                    message: errors.expected.semi,
                    line: 3,
                    column: 23,
                },
            ],
        },
        {
            code: "interface Foo { [key: string]: any }",
            output: "interface Foo { [key: string]: any; }",
            options: [{ singleLine: "semi" }],
            errors: [
                {
                    message: errors.expected.semi,
                    line: 1,
                    column: 35,
                },
            ],
        },
        {
            code: "interface Foo { [key: string]: any }",
            output: "interface Foo { [key: string]: any; }",
            options: [
                {
                    requireLast: true,
                    singleLine: "semi",
                },
            ],
            errors: [
                {
                    message: errors.expected.semi,
                    line: 1,
                    column: 35,
                },
            ],
        },
        {
            code: "interface Foo { [key: string]: any }",
            output: "interface Foo { [key: string]: any; }",
            options: [
                {
                    requireLast: true,
                    singleLine: "none",
                    overrides: {
                        interface: { singleLine: "semi" },
                    },
                },
            ],
            errors: [
                {
                    message: errors.expected.semi,
                    line: 1,
                    column: 35,
                },
            ],
        },
        {
            code: `
type Foo = {
    [key: string]: any
}
            `,
            output: `
type Foo = {
    [key: string]: any;
}
            `,
            errors: [
                {
                    message: errors.expected.semi,
                    line: 3,
                    column: 23,
                },
            ],
        },
        {
            code: `
type Foo = {
    [key: string]: any
}
            `,
            output: `
type Foo = {
    [key: string]: any;
}
            `,
            options: [{ singleLine: "semi" }],
            errors: [
                {
                    message: errors.expected.semi,
                    line: 3,
                    column: 23,
                },
            ],
        },
        {
            code: "type Foo = { [key: string]: any }",
            output: "type Foo = { [key: string]: any; }",
            options: [{ singleLine: "semi" }],
            errors: [
                {
                    message: errors.expected.semi,
                    line: 1,
                    column: 32,
                },
            ],
        },
        {
            code: "type Foo = { [key: string]: any }",
            output: "type Foo = { [key: string]: any; }",
            options: [
                {
                    requireLast: true,
                    singleLine: "semi",
                },
            ],
            errors: [
                {
                    message: errors.expected.semi,
                    line: 1,
                    column: 32,
                },
            ],
        },
        {
            code: "type Foo = { [key: string]: any }",
            output: "type Foo = { [key: string]: any; }",
            options: [
                {
                    requireLast: true,
                    singleLine: "none",
                    overrides: {
                        typeLiteral: { singleLine: "semi" },
                    },
                },
            ],
            errors: [
                {
                    message: errors.expected.semi,
                    line: 1,
                    column: 32,
                },
            ],
        },
        {
            code: `
interface Foo {
    name: string;
    age: number;
}
            `,
            options: [{ delimiter: "semi", requireLast: false }],
            errors: [
                {
                    message: errors.unexpected.semi,
                    line: 4,
                    column: 17,
                },
            ],
        },
        {
            code: `
interface Foo {
    name: string;
    age: number;
}
            `,
            options: [
                {
                    delimiter: "comma",
                    requireLast: true,
                    overrides: {
                        interface: {
                            delimiter: "semi",
                            requireLast: false,
                        },
                    },
                },
            ],
            errors: [
                {
                    message: errors.unexpected.semi,
                    line: 4,
                    column: 17,
                },
            ],
        },
        {
            code: "interface Foo { [key: string]: any }",
            errors: [
                {
                    message: errors.expected.semi,
                    line: 1,
                    column: 35,
                },
            ],
        },
        {
            code: `
type Foo = {
    name: string;
    age: number;
}
            `,
            options: [{ delimiter: "semi", requireLast: false }],
            errors: [
                {
                    message: errors.unexpected.semi,
                    line: 4,
                    column: 17,
                },
            ],
        },
        {
            code: `
type Foo = {
    name: string;
    age: number;
}
            `,
            options: [
                {
                    delimiter: "comma",
                    requireLast: true,
                    overrides: {
                        typeLiteral: { delimiter: "semi", requireLast: false },
                    },
                },
            ],
            errors: [
                {
                    message: errors.unexpected.semi,
                    line: 4,
                    column: 17,
                },
            ],
        },
        {
            code: "type Foo = { [key: string]: any }",
            errors: [
                {
                    message: errors.expected.semi,
                    line: 1,
                    column: 32,
                },
            ],
        },
    ],
});
