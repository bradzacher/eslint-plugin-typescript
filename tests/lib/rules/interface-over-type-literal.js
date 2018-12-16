/**
 * @fileoverview Prefer an interface declaration over a type literal (type T = { ... })
 * @author Armano <https://github.com/armano2>
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/interface-over-type-literal"),
    RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
    parser: "typescript-eslint-parser",
});

ruleTester.run("interface-over-type-literal", rule, {
    valid: [
        {
            code: `var foo = { };`,
        },
        {
            code: `type U = string;`,
        },
        {
            code: `type V = { x: number; } | { y: string; };`,
        },
        {
            code: `
type Record<T, U> = {
    [K in T]: U;
}
            `,
        },
    ],
    invalid: [
        {
            code: `type T = { x: number; }`,
            output: `interface T { x: number; }`,
            errors: [
                {
                    messageId: "interfaceOverType",
                    line: 1,
                    column: 6,
                },
            ],
        },
        {
            code: `type T={ x: number; }`,
            output: `interface T { x: number; }`,
            errors: [
                {
                    messageId: "interfaceOverType",
                    line: 1,
                    column: 6,
                },
            ],
        },
        {
            code: `type T=                         { x: number; }`,
            output: `interface T { x: number; }`,
            errors: [
                {
                    messageId: "interfaceOverType",
                    line: 1,
                    column: 6,
                },
            ],
        },
        {
            code: `
export type W<T> = {
    x: T,
};
`,
            output: `
export interface W<T> {
    x: T,
}
`,
            errors: [
                {
                    messageId: "interfaceOverType",
                    line: 2,
                    column: 13,
                },
            ],
        },
    ],
});
