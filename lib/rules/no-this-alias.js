/**
 * @fileoverview Disallow aliasing `this`
 * @author Jed Fox
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "Disallow aliasing `this`",
            category: "Best Practices",
            recommended: false,
        },
        fixable: null, // or "code" or "whitespace"
        schema: [
            {
                type: "object",
                additionalProperties: false,
                properties: {
                    allowDestructuring: {
                        type: "boolean",
                    },
                    allowedNames: {
                        type: "array",
                        items: {
                            type: "string",
                        },
                    },
                },
            },
        ],
    },

    create(context) {
        const { allowDestructuring = false, allowedNames = [] } =
            context.options[0] || {};

        return {
            VariableDeclarator(node) {
                const { id, init } = node;

                if (init.type !== "ThisExpression") return;
                if (allowDestructuring && node.id.type !== "Identifier") return;

                if (!allowedNames.includes(id.name)) {
                    context.report({
                        node: id,
                        message:
                            id.type === "Identifier"
                                ? "Unexpected aliasing of 'this' to local variable"
                                : "Unexpected aliasing of members of 'this' to local variables",
                    });
                }
            },
        };
    },
};
