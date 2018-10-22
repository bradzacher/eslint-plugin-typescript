/**
 * @fileoverview Use function types instead of interfaces with call signatures
 * @author Benjamin Lichtman
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/callable-types"),

    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("callable-types", rule, {

    valid: [

        // give me some code that won't trigger a warning
    ],

    invalid: [
        {
            code: "interface Foo { (): string }",
            errors: [{
                message: "Fill me in.",
                type: "Me too"
            }]
        }
    ]
});
