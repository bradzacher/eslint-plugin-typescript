/**
 * @fileoverview When adding two variables, operands must both be of type number or of type string.
 * @author James Henry
 * @author Armano <https://github.com/armano2>
 */
"use strict";

const util = require("../util");

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description:
                "When adding two variables, operands must both be of type number or of type string.",
            extraDescription: [util.tslintRule("restrict-plus-operands")],
            category: "TypeScript",
            url: util.metaDocsUrl("restrict-plus-operands"),
        },
        schema: [],
        messages: {
            notNumbers:
                "Operands of '+' operation must either be both strings or both numbers.",
            notStrings:
                "Operands of '+' operation must either be both strings or both numbers, consider using template literals."
        },
    },

    create(context) {
        function getTSNode(node) {
            return (
                context.parserServices &&
                context.parserServices.esTreeNodeToTSNodeMap &&
                context.parserServices.esTreeNodeToTSNodeMap.get(node)
            );
        }

        function getTypeChecker() {
            return (
                context.parserServices &&
                context.parserServices.program &&
                context.parserServices.program.getTypeChecker()
            );
        }

        function getNodeType(node) {
            const tsNode = getTSNode(node);
            const typeChecker = getTypeChecker();

            if (tsNode && typeChecker) {
                const type = typeChecker.getTypeAtLocation(tsNode);

                if (type) {
                    if (type.isNumberLiteral() || type.flags & 32 || type.flags & 2) {
                        return "number";
                    }
                    if (type.isStringLiteral() || type.flags & 64 || type.flags & 4) {
                        return "string";
                    }
                }
                const stringType = typeChecker.typeToString(type);

                if (stringType === "number" || stringType === "number") {
                    return stringType;
                }
                return "invalid";
            }
            return null;
        }

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------
        return {
            "BinaryExpression[operator='+']"(node) {
                if (node.right && node.left) {
                    const rightType = getNodeType(node.right);
                    const leftType = getNodeType(node.left);

                    if (!rightType || !leftType) {
                        return; // when there is no parser service
                    }

                    if (leftType === "invalid" || rightType === "invalid" || leftType !== rightType) {
                        if (leftType === "string" || rightType === "string") {
                            context.report({
                                node,
                                messageId: "notStrings",
                            });
                        } else {
                            context.report({
                                node,
                                messageId: "notNumbers",
                            });
                        }
                    }
                }
            },
        };
    },
};
