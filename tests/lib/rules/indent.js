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
    ],
});
