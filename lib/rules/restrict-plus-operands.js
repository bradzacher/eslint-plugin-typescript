/**
 * @fileoverview When adding two variables, operands must both be of type number or of type string.
 * @author James Henry
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "When adding two variables, operands must both be of type number or of type string.",
            category: "TypeScript"
        },
        schema: []
    },

    create: function(context) {

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------
        return {
            BinaryExpression(node) {

                var ts = context.parserServices.ts;
                var tsNode = context.parserServices.getTSNode(node);

                if (tsNode.operatorToken.kind === ts.SyntaxKind.PlusToken) {

                    var program = context.parserServices.getCurrentProgram();
                    var tc = program.getTypeChecker();
                    var leftType = tc.typeToString(tc.getTypeAtLocation(tsNode.left));
                    var rightType = tc.typeToString(tc.getTypeAtLocation(tsNode.right));

                    if (leftType !== rightType) {
                        context.report({
                            node: node,
                            message: "Cannot add a '" + leftType + "' to a '" + rightType + "'."
                        });
                        return;
                    }

                    if (leftType !== "number" && leftType !== "string") {
                        context.report({
                            node: node,
                            message: "'" + leftType + "' is not a supported type for addition."
                        });
                        return;
                    }

                }
            }
        };
    }
};
