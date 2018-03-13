/**
 * @fileoverview Requires using either 'T[]' or 'Array' for arrays.
 * @author Mackie Underdown
 */
"use strict";

const util = require("../util");

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "Requires using either 'T[]' or 'Array' for arrays",
            extraDescription: [util.tslintRule("array-type")],
            category: "TypeScript",
            url:
                "https://github.com/nzakas/eslint-plugin-typescript/blob/master/docs/rules/array-type.md"
        },
        schema: [
            {
                enum: ["array", "generic", "array-simple"]
            }
        ]
    },
    create(context) {
        const arrayType = context.options[0] || "array";
        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------

        return {
            TypeAnnotation: console.log, // eslint-disable-line no-console
            TSArrayType(node) {
                console.log(node); // eslint-disable-line no-console
                if (arrayType === "generic") {
                    context.report({
                        node,
                        message:
                            "Array type using 'T[]' is forbidden. Use 'Array<T>' instead."
                    });
                }
            },
            TSTypeReference(node) {
                console.log(node); // eslint-disable-line no-console
                if (node.typeName.name === "Array" && arrayType === "array") {
                    context.report({
                        node,
                        message:
                            "Array type using 'Array<T>' is forbidden. Use 'T[]' instead."
                    });
                }
            }
        };
    }
};
