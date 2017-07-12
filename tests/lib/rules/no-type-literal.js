/**
 * @fileoverview Enforces the use of interfaces over literal types
 * @author Patricio Trevino
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/no-type-literal"),
    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("no-type-literal", rule, {

    valid: [
        {
            code: `
interface Bar {
    count: number;
};
            `,
            parser: "typescript-eslint-parser"
        },
        {
            code: "type Bar = 'a'",
            parser: "typescript-eslint-parser"
        },
        {
            code: "type Bar = 'a' | 'b'",
            parser: "typescript-eslint-parser"
        },
        {
            code: "type Bar = string | string[];",
            parser: "typescript-eslint-parser"
        },
        {
            code: "type Bar = string & string[]",
            parser: "typescript-eslint-parser"
        },
        {
            code: "type Bar = (a: number) => void;",
            parser: "typescript-eslint-parser"
        },
        {
            code: `
type Bar = string & {
    count: number 
};
            `,
            parser: "typescript-eslint-parser",
            options: [{ allowIntersection: true }]
        },
        {
            code: `
type Bar = string | {
    count: number 
};
            `,
            parser: "typescript-eslint-parser",
            options: [{ allowUnion: true }]
        }
    ],
    invalid: [
        {
            code: `
type Bar = {
    count: number 
};
            `,
            parser: "typescript-eslint-parser",
            errors: [
                {
                    message: "Use interfaces instead of type literals",
                    row: 2,
                    column: 1
                }
            ]
        },
        {
            code: `
type Bar = string & {
    count: number 
};
            `,
            parser: "typescript-eslint-parser",
            errors: [
                {
                    message: "Use interfaces instead of type literals",
                    row: 2,
                    column: 1
                }
            ]
        },
        {
            code: `
type Bar = string & {
    count: number 
};
            `,
            parser: "typescript-eslint-parser",
            options: [{ allowUnion: true }],
            errors: [
                {
                    message: "Use interfaces instead of type literals",
                    row: 2,
                    column: 1
                }
            ]
        },
        {
            code: `
type Bar = string | {
    count: number 
};
            `,
            parser: "typescript-eslint-parser",
            errors: [
                {
                    message: "Use interfaces instead of type literals",
                    row: 2,
                    column: 1
                }
            ]
        },
        {
            code: `
type Bar = string | {
    count: number 
};
            `,
            parser: "typescript-eslint-parser",
            options: [{ allowIntersection: true }],
            errors: [
                {
                    message: "Use interfaces instead of type literals",
                    row: 2,
                    column: 1
                }
            ]
        },
        {
            code: `
type Bar = string | {
    count: number 
};

type Baz = string & {
    count: number
};
            `,
            parser: "typescript-eslint-parser",
            options: [{ allowIntersection: false, allowUnion: true }],
            errors: [
                {
                    message: "Use interfaces instead of type literals",
                    row: 6,
                    column: 1
                }
            ]
        },
        {
            code: `
type Bar = string | {
    count: number 
};

type Baz = string & {
    count: number
};
            `,
            parser: "typescript-eslint-parser",
            options: [{ allowIntersection: true, allowUnion: false }],
            errors: [
                {
                    message: "Use interfaces instead of type literals",
                    row: 2,
                    column: 1
                }
            ]
        },
        {
            code: `
type Bar = string | {
    count: number 
};

type Baz = string & {
    count: number
};
            `,
            parser: "typescript-eslint-parser",
            errors: [
                {
                    message: "Use interfaces instead of type literals",
                    row: 2,
                    column: 1
                },
                {
                    message: "Use interfaces instead of type literals",
                    row: 6,
                    column: 1
                }
            ]
        },
        {
            code: `
type Bar = string | {
    count: number 
};

type Baz = string & {
    count: number
};
            `,
            parser: "typescript-eslint-parser",
            options: [{ allowIntersection: false, allowUnion: false }],
            errors: [
                {
                    message: "Use interfaces instead of type literals",
                    row: 2,
                    column: 1
                },
                {
                    message: "Use interfaces instead of type literals",
                    row: 6,
                    column: 1
                }
            ]
        }
    ]
});
