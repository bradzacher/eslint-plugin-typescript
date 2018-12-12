/**
 * @fileoverview Check internal rule
 * @author Armano <https://github.com/armano2>
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/indent"),
    RuleTester = require("eslint").RuleTester;

const ruleTester = new RuleTester({
    parserOptions: {
        ecmaVersion: 6,
        sourceType: "module",
        ecmaFeatures: {},
    },
    parser: "typescript-eslint-parser",
});

ruleTester.run("indent", rule, {
    valid: [],
    invalid: [
        {
            code: `
type Foo = {
bar : string,
age : number,
}
            `,
            output: `
type Foo = {
    bar : string,
    age : number,
}
            `,
            errors: [
                {
                    message: `Expected indentation of 4 spaces but found 0.`,
                    line: 3,
                    column: 1,
                },
                {
                    message: `Expected indentation of 4 spaces but found 0.`,
                    line: 4,
                    column: 1,
                },
            ],
        },
        {
            code: `
interface Foo {
bar : string,
age : number,
}
            `,
            output: `
interface Foo {
    bar : string,
    age : number,
}
            `,
            errors: [
                {
                    message: `Expected indentation of 4 spaces but found 0.`,
                    line: 3,
                    column: 1,
                },
                {
                    message: `Expected indentation of 4 spaces but found 0.`,
                    line: 4,
                    column: 1,
                },
            ],
        },
        {
            code: `
interface Foo {
bar : {
baz : string,
},
age : number,
}
            `,
            output: `
interface Foo {
    bar : {
        baz : string,
    },
    age : number,
}
            `,
            errors: [
                {
                    message: `Expected indentation of 4 spaces but found 0.`,
                    line: 3,
                    column: 1,
                },
                {
                    message: `Expected indentation of 8 spaces but found 0.`,
                    line: 4,
                    column: 1,
                },
                {
                    message: `Expected indentation of 4 spaces but found 0.`,
                    line: 5,
                    column: 1,
                },
                {
                    message: `Expected indentation of 4 spaces but found 0.`,
                    line: 6,
                    column: 1,
                },
            ],
        },
        {
            code: `
const foo : Foo<{
bar : string,
age : number,
}>
            `,
            output: `
const foo : Foo<{
    bar : string,
    age : number,
}>
            `,
            errors: [
                {
                    message: `Expected indentation of 4 spaces but found 0.`,
                    line: 3,
                    column: 1,
                },
                {
                    message: `Expected indentation of 4 spaces but found 0.`,
                    line: 4,
                    column: 1,
                },
            ],
        },
        {
            code: `
type T = {
bar : string,
age : number,
} | {
bar : string,
age : number,
}
            `,
            output: `
type T = {
    bar : string,
    age : number,
} | {
    bar : string,
    age : number,
}
            `,
            errors: [
                {
                    message: `Expected indentation of 4 spaces but found 0.`,
                    line: 3,
                    column: 1,
                },
                {
                    message: `Expected indentation of 4 spaces but found 0.`,
                    line: 4,
                    column: 1,
                },
                {
                    message: `Expected indentation of 4 spaces but found 0.`,
                    line: 6,
                    column: 1,
                },
                {
                    message: `Expected indentation of 4 spaces but found 0.`,
                    line: 7,
                    column: 1,
                },
            ],
        },
        {
            code: `
type T =
    | {
bar : string,
age : number,
}
    | {
    bar : string,
    age : number,
}
            `,
            output: `
type T =
    | {
        bar : string,
        age : number,
    }
    | {
        bar : string,
        age : number,
    }
            `,
            errors: [
                {
                    message: `Expected indentation of 8 spaces but found 0.`,
                    line: 4,
                    column: 1,
                },
                {
                    message: `Expected indentation of 8 spaces but found 0.`,
                    line: 5,
                    column: 1,
                },
                {
                    message: `Expected indentation of 4 spaces but found 0.`,
                    line: 6,
                    column: 1,
                },
                {
                    message: `Expected indentation of 8 spaces but found 4.`,
                    line: 8,
                    column: 1,
                },
                {
                    message: `Expected indentation of 8 spaces but found 4.`,
                    line: 9,
                    column: 1,
                },
                {
                    message: `Expected indentation of 4 spaces but found 0.`,
                    line: 10,
                    column: 1,
                },
            ],
        },
        {
            code: `
    import Dialogs = require("widgets/Dialogs");
            `,
            output: `
import Dialogs = require("widgets/Dialogs");
            `,
            errors: [
                {
                    message: `Expected indentation of 0 spaces but found 4.`,
                    line: 2,
                    column: 1,
                },
            ],
        },
        {
            code: `
class Foo {
public bar : string;
private bar : string;
protected bar : string;
abstract bar : string;
foo : string;
}
            `,
            output: `
class Foo {
    public bar : string;
    private bar : string;
    protected bar : string;
    abstract bar : string;
    foo : string;
}
            `,
            errors: [
                {
                    message: `Expected indentation of 4 spaces but found 0.`,
                    line: 3,
                    column: 1,
                },
                {
                    message: `Expected indentation of 4 spaces but found 0.`,
                    line: 4,
                    column: 1,
                },
                {
                    message: `Expected indentation of 4 spaces but found 0.`,
                    line: 5,
                    column: 1,
                },
                {
                    message: `Expected indentation of 4 spaces but found 0.`,
                    line: 6,
                    column: 1,
                },
                {
                    message: `Expected indentation of 4 spaces but found 0.`,
                    line: 7,
                    column: 1,
                },
            ],
        },
        {
            code: `
    abstract class Foo {}
    class Foo {}
            `,
            output: `
abstract class Foo {}
class Foo {}
            `,
            errors: [
                {
                    message: `Expected indentation of 0 spaces but found 4.`,
                    line: 2,
                    column: 1,
                },
                {
                    message: `Expected indentation of 0 spaces but found 4.`,
                    line: 3,
                    column: 1,
                },
            ],
        },
    ],
});
