/**
 * @fileoverview Disallow iterating over an array with a for-in loop
 * @author Benjamin Lichtman
 */
"use strict";
const ts = require("typescript");

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/**
 * @type {import("eslint").Rule.RuleModule}
 */
module.exports = {
    meta: {
        docs: {
            description: "Disallow iterating over an array with a for-in loop",
            category: "Possible errors",
            recommended: false,
        },
        fixable: null,
        schema: [],
        type: "problem",
    },

    create(context) {
        return {
            ForInStatement(node) {
                if (
                    !context.parserServices ||
                    !context.parserServices.program
                ) {
                    return;
                }

                /**
                 * @type {ts.TypeChecker}
                 */
                const checker = context.parserServices.program.getTypeChecker();
                const originalNode = context.parserServices.esTreeNodeToTSNodeMap.get(
                    node
                );

                if (!originalNode) {
                    return;
                }

                const type = checker.getTypeAtLocation(originalNode.expression);

                if (
                    (typeof type.symbol !== "undefined" &&
                        type.symbol.name === "Array") ||
                    (type.flags & ts.TypeFlags.StringLike) !== 0
                ) {
                    context.report({
                        node,
                        message:
                            "For-in loops over arrays are forbidden. Use for-of or array.forEach instead.",
                    });
                }
            },
        };
    },
};
