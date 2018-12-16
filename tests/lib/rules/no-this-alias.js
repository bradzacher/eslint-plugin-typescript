/**
 * @fileoverview Disallow aliasing `this`
 * Some tests taken from TSLint:  https://github.com/palantir/tslint/tree/c7fc99b5/test/rules/no-this-assignment
 * @author Jed Fox
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/no-this-alias"),
    RuleTester = require("eslint").RuleTester;

const idMessage = "Unexpected aliasing of 'this' to local variable";
const destructureMessage =
    "Unexpected aliasing of members of 'this' to local variables";

const idError = { message: idMessage, type: "Identifier" };
const destructureError = { message: destructureMessage, type: "ObjectPattern" };
const arrayDestructureError = {
    message: destructureMessage,
    type: "ArrayPattern",
};

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
    parser: "typescript-eslint-parser",
});

ruleTester.run("no-this-alias", rule, {
    valid: [
        "const self = foo(this);",
        {
            code: `
const { props, state } = this;
const { length } = this;
const { length, toString } = this;
const [foo] = this;
const [foo, bar] = this;
`.trim(),
            options: [
                {
                    allowDestructuring: true,
                },
            ],
        },
        {
            code: "const self = this;",
            options: [
                {
                    allowedNames: ["self"],
                },
            ],
        },
    ],

    invalid: [
        {
            code: "const self = this;",
            options: [
                {
                    allowDestructuring: true,
                },
            ],
            errors: [idError],
        },
        {
            code: "const self = this;",
            errors: [idError],
        },
        {
            code: "const { props, state } = this;",
            errors: [
                {
                    message: destructureMessage,
                    type: "ObjectPattern",
                },
            ],
        },
        {
            code: `
var unscoped = this;

function testFunction() {
    let inFunction = this;
}
const testLambda = () => {
    const inLambda = this;
};
`.trim(),
            errors: [idError, idError, idError],
        },
        {
            code: `
class TestClass {
    constructor() {
        const inConstructor = this;
        const asThis: this = this;

        const asString = "this";
        const asArray = [this];
        const asArrayString = ["this"];
    }

    public act(scope: this = this) {
        const inMemberFunction = this;
        const { act } = this;
        const { act, constructor } = this;
        const [foo] = this;
        const [foo, bar] = this;
    }
}
`.trim(),
            errors: [
                idError,
                idError,
                idError,
                destructureError,
                destructureError,
                arrayDestructureError,
                arrayDestructureError,
            ],
        },
    ],
});
