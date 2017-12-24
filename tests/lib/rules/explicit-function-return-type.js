/**
 * @fileoverview Enforces explicit return type for functions
 * @author Scott O'Hara
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/explicit-function-return-type"),
    RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
    parser: "typescript-eslint-parser"
});

ruleTester.run("explicit-function-return-type", rule, {
    valid: [
        `
function test(): void {
    return;
}
        `,
        `
var fn = function(): number {
    return 1;
};
        `,
        `
var arrowFn = (): string => 'test';
        `,
        `
class Test {
  method(): void {
    return;
  }
}
        `
    ],
    invalid: [
        {
            code: `
function test() {
    return;
}
            `,
            errors: [
                {
                    message: "Missing return type on function.",
                    line: 2,
                    column: 1
                }
            ]
        },
        {
            code: `
var fn = function() {
    return 1;
};
            `,
            errors: [
                {
                    message: "Missing return type on function.",
                    line: 2,
                    column: 10
                }
            ]
        },
        {
            code: `
var arrowFn = () => 'test';
            `,
            errors: [
                {
                    message: "Missing return type on function.",
                    line: 2,
                    column: 15
                }
            ]
        },
        {
            code: `
class Test {
  method() {
    return;
  }
}
            `,
            errors: [
                {
                    message: "Missing return type on function.",
                    line: 3,
                    column: 9
                }
            ]
        }
    ]
});
