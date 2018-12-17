/**
 * @fileoverview Enforces that there is no semantic and syntactic errors
 * @author Armano <https://github.com/armano2>
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------
const path = require("path");

const rule = require("../../../lib/rules/no-semantic-errors"),
    RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const rootPath = path.join(process.cwd(), "tests/lib/fixtures/empty");
// valid filePath is required to get access to lib
// @see https://github.com/JamesHenry/typescript-estree/issues/50
const filePath = path.join(rootPath, "empty.ts");

const ruleTester = new RuleTester({
    parser: "typescript-eslint-parser",
    parserOptions: {
        generateServices: true,
        tsconfigRootDir: rootPath,
        project: "./tsconfig.json",
    },
});

ruleTester.run("no-errors", rule, {
    valid: [
        {
            filename: filePath,
            code: `
import Foo from './import';
var foo: Foo = {
    name: 'test'
};
            `,
        },
        {
            filename: filePath,
            code: `var foo: number = parseInt("5.5", 10) + 10;`,
        },
    ],
    invalid: [
        {
            filename: filePath,
            code: `var foo: string = parseInt("5.5", 10) + 10;`,
            errors: [
                {
                    message:
                        "Type 'number' is not assignable to type 'string'.",
                    line: 1,
                    column: 5,
                    type: "Identifier",
                },
            ],
        },
        {
            filename: filePath,
            code: `
import Foo from './import';
var foo: Foo = {
    name: 2
};
            `,
            errors: [
                {
                    message:
                        "Type 'number' is not assignable to type 'string'.",
                    line: 4,
                    column: 5,
                    type: "Identifier",
                },
            ],
        },
        {
            filename: filePath,
            code: `
import Foo from './not-found';
var foo: Foo = {
    name: 2
};
            `,
            errors: [
                {
                    message: "Cannot find module './not-found'.",
                    line: 2,
                    column: 17,
                    type: "Literal",
                },
            ],
        },
    ],
});
