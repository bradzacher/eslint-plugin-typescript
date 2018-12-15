/**
 * @fileoverview When adding two variables, operands must both be of type number or of type string.
 * @author James Henry
 * @author Armano <https://github.com/armano2>
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------
const path = require("path");

const rule = require("../../../lib/rules/restrict-plus-operands"),
    RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
    parser: "typescript-eslint-parser",
    parserOptions: {
        generateServices: true,
        project: path.join(__dirname, "tsconfig.json"),
        tsconfigRootDir: path.resolve(__dirname),
    },
});

ruleTester.run("restrict-plus-operands", rule, {
    valid: [
        {
            code: `var x = 5;`,
        },
        {
            code: `var y = "10";`,
        },
        {
            code: `var z = 8.2;`,
        },
        {
            code: `var w = "6.5";`,
        },
        {
            code: `var foo = 5 + 10;`,
        },
        {
            code: `var foo = "5.5" + "10";`,
        },
        {
            code: `var foo = parseFloat("5.5", 10) + 10;`,
        },
        {
            code: `
function test () : number { return 2; }
var foo = test("5.5", 10) + 10;
            `,
        },
        {
            code: `
var x = 5;
var z = 8.2;
var foo = x + z;
            `,
        },
        {
            code: `
var w = "6.5";
var y = "10";
var foo = y + w;
            `,
        },
        {
            code: "var foo = 1 + 1;",
        },
        {
            code: "var foo = '1' + '1';",
        },
        {
            code: `
var pair: { first: number, second: string } = { first: 5, second: "10" };
var foo = pair.first + 10;
            `,
        },
        {
            code: `
var pair: { first: number, second: string } = { first: 5, second: "10" };
var foo = pair.first + (10 as number);
            `,
        },
        {
            code: `
var pair: { first: number, second: string } = { first: 5, second: "10" };
var foo = "5.5" + pair.second;
            `,
        },
        {
            code: `
var pair: { first: number, second: string } = { first: 5, second: "10" };
var foo = ("5.5" as string) + pair.second;
            `,
        },
        {
            code: `const foo = 'hello' + (someBoolean ? 'a' : 'b') + (() => someBoolean ? 'c' : 'd')() + 'e';`,
        },
        {
            code: `const balls = true;`,
        },
        {
            code: `balls === true;`,
        },
    ],
    invalid: [
        {
            code: "var foo = '1' + 1;",
            errors: [
                {
                    messageId: "notStrings",
                    line: 1,
                    column: 11,
                },
            ],
        },
        {
            code: "var foo = [] + {};",
            errors: [
                {
                    messageId: "notNumbers",
                    line: 1,
                    column: 11,
                },
            ],
        },
        {
            code: `var foo = 5 + "10";`,
            errors: [
                {
                    messageId: "notStrings",
                    line: 1,
                    column: 11,
                },
            ],
        },
        {
            code: `var foo = [] + 5;`,
            errors: [
                {
                    messageId: "notNumbers",
                    line: 1,
                    column: 11,
                },
            ],
        },
        {
            code: `var foo = [] + {};`,
            errors: [
                {
                    messageId: "notNumbers",
                    line: 1,
                    column: 11,
                },
            ],
        },
        {
            code: `var foo = [] + [];`,
            errors: [
                {
                    messageId: "notNumbers",
                    line: 1,
                    column: 11,
                },
            ],
        },
        {
            code: `var foo = 5 + [];`,
            errors: [
                {
                    messageId: "notNumbers",
                    line: 1,
                    column: 11,
                },
            ],
        },
        {
            code: `var foo = "5" + {};`,
            errors: [
                {
                    messageId: "notStrings",
                    line: 1,
                    column: 11,
                },
            ],
        },
        {
            code: `var foo = 5.5 + "5";`,
            errors: [
                {
                    messageId: "notStrings",
                    line: 1,
                    column: 11,
                },
            ],
        },
        {
            code: `var foo = "5.5" + 5;`,
            errors: [
                {
                    messageId: "notStrings",
                    line: 1,
                    column: 11,
                },
            ],
        },
        {
            code: `
var x = 5;
var y = "10";
var foo = x + y;
            `,
            errors: [
                {
                    messageId: "notStrings",
                    line: 4,
                    column: 11,
                },
            ],
        },
        {
            code: `
var x = 5;
var y = "10";
var foo = y + x;
            `,
            errors: [
                {
                    messageId: "notStrings",
                    line: 4,
                    column: 11,
                },
            ],
        },
        {
            code: `
var x = 5;
var foo = x + {};
            `,
            errors: [
                {
                    messageId: "notNumbers",
                    line: 3,
                    column: 11,
                },
            ],
        },
        {
            code: `
var y = "10";
var foo = [] + y;
            `,
            errors: [
                {
                    messageId: "notStrings",
                    line: 3,
                    column: 11,
                },
            ],
        },
        {
            code: `
var pair: { first: number, second: string } = { first: 5, second: "10" };
var foo = pair.first + "10";
            `,
            errors: [
                {
                    messageId: "notStrings",
                    line: 3,
                    column: 11,
                },
            ],
        },
        {
            code: `
var pair: { first: number, second: string } = { first: 5, second: "10" };
var foo = 5 + pair.second;
            `,
            errors: [
                {
                    messageId: "notStrings",
                    line: 3,
                    column: 11,
                },
            ],
        },
        {
            code: `
var pair = { first: 5, second: "10" };
var foo = pair + pair;
            `,
            errors: [
                {
                    messageId: "notNumbers",
                    line: 3,
                    column: 11,
                },
            ],
        },
    ],
});
