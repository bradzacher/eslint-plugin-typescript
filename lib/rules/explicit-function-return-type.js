/**
 * @fileoverview Enforces explicit return type for functions
 * @author Scott O'Hara
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description:
                "Require explicit return types on functions and class methods",
            category: "TypeScript"
        },
        schema: []
    },

    create(context) {
        //----------------------------------------------------------------------
        // Helpers
        //----------------------------------------------------------------------

        /**
         * Checks if a function declaration/expression has a return type.
         * @param {ASTNode} node The node representing a function.
         * @returns {void}
         * @private
         */
        function checkFunctionReturnType(node) {
            if (!node.returnType) {
                context.report({
                    node,
                    message: `Missing return type on function.`
                });
            }
        }

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------
        return {
            FunctionDeclaration: checkFunctionReturnType,
            FunctionExpression: checkFunctionReturnType,
            ArrowFunctionExpression: checkFunctionReturnType
        };
    }
};
