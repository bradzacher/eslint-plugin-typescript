/**
 * @fileoverview Use function types instead of interfaces with call signatures
 * @author Benjamin Lichtman
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/callable-types"),
    RuleTester = require("eslint").RuleTester,
    path = require("path");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const rootDir = path.join(process.cwd(), "tests/lib/fixtures");
const parserOptions = {
    ecmaVersion: 2015,
    tsconfigRootDir: rootDir,
    project: "./tsconfig.json",
};
const ruleTester = new RuleTester({
    parserOptions,
    parser: "typescript-eslint-parser",
});

ruleTester.run("callable-types", rule, {
    valid: [
        `
interface Foo {
    (): void;
    bar: number;
}`,
        `
type Foo = {
    (): void;
    bar: number;
}`,
        `
function foo(bar: { (): string, baz: number }): string {
    return bar();
}`,
        `
interface Foo {
    bar: string;
}
interface Bar extends Foo {
    (): void;
}`,
    ],

    invalid: [
        {
            code: `
interface Foo {
    (): string;
}`,
            errors: [
                {
                    message: `Interface has only a call signature - use \`type Foo = () => string;\` instead.`,
                    type: "TSCallSignature",
                },
            ],
        },
        {
            code: `
type Foo = {
    (): string;
}`,
            errors: [
                {
                    message: `Type literal has only a call signature - use \`() => string\` instead.`,
                    type: "TSCallSignature",
                },
            ],
        },
        {
            code: `
function foo(bar: { (): number }): number {
    return bar();
}`,
            errors: [
                {
                    message: `Type literal has only a call signature - use \`() => number\` instead.`,
                    type: "TSCallSignature",
                },
            ],
        },
        {
            code: `
interface Foo extends Function {
    (): void;
}`,
            errors: [
                {
                    message: `Interface has only a call signature - use \`type Foo = () => void;\` instead.`,
                    type: "TSCallSignature",
                },
            ],
        },
    ],
});
