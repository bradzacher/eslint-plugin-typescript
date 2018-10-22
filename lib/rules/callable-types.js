/**
 * @fileoverview Use function types instead of interfaces with call signatures
 * @author Benjamin Lichtman
 */
"use strict";
const ts = require("typescript");
const tsutils = require("tsutils");
const util = require("../util");

/**
 * @typedef {util.Context} Context
 * @typedef {util.ESTreeNode} ESTreeNode
 */

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description:
                "Use function types instead of interfaces with call signatures",
            category: "Fill me in",
            recommended: false
        },
        fixable: "code", // or "code" or "whitespace"
        schema: [
            // fill in your schema
        ]
    },

    /**
     * @param {Context} context ESLint rule context
     * @returns {*} Rule listeners
     */
    create(context) {
        // variables should be defined here

        //----------------------------------------------------------------------
        // Helpers
        //----------------------------------------------------------------------

        /**
         * @param {string} type The incorrect type of callable construct
         * @param {string} sigSuggestion The recommended type of callable construct
         * @returns {string} The error message
         */
        function failureMessage(type, sigSuggestion) {
            return `${type} has only a call signature - use \`${sigSuggestion}\` instead.`;
        }

        /**
         * Checks if there is no supertype or if the supertype is 'Function'
         * @param {ESTreeNode} node The node being checked
         * @returns {boolean} Returns true iff there is no supertype or if the supertype is 'Function'
         */
        function noSupertype(node) {
            if (typeof node.heritage === "undefined") {
                return true;
            }
            if (node.heritage.length !== 1) {
                return false;
            }
            const expr = node.heritage[0].id;

            return (
                util.esTreeNodeHasKind(expr, ts.SyntaxKind.Identifier) &&
                expr.name === "Function"
            );
        }

        /**
         * @param {ESTreeNode} parent The parent of the call signature causing the diagnostic
         * @returns {boolean} true iff the parent node needs to be wrapped for readability
         */
        function shouldWrapSuggestion(parent) {
            switch (parent.type) {
                case util.getESTreeType(ts.SyntaxKind.UnionType):
                case util.getESTreeType(ts.SyntaxKind.IntersectionType):
                case util.getESTreeType(ts.SyntaxKind.ArrayType):
                    return true;
                default:
                    return false;
            }
        }

        /**
         * @param {ESTreeNode} call The call signature causing the diagnostic
         * @param {ESTreeNode} parent The parent of the call
         * @returns {string} The suggestion to report
         */
        function renderSuggestion(call, parent) {
            const sourceCode = context.getSourceCode();
            const start = call.range[0];
            const colonPos = call.typeAnnotation.range[0] - start;
            const text = sourceCode.getText().substring(start, call.range[1]);

            let suggestion = `${text.substr(0, colonPos)} =>${text.substr(
                colonPos + 1
            )}`;

            if (shouldWrapSuggestion(parent.parent)) {
                suggestion = `(${suggestion})`;
            }
            if (
                util.esTreeNodeHasKind(
                    parent,
                    ts.SyntaxKind.InterfaceDeclaration
                )
            ) {
                if (typeof parent.typeParameters !== "undefined") {
                    return `type${sourceCode
                        .getText()
                        .substring(
                            parent.name.pos,
                            parent.typeParameters.end + 1
                        )} = ${suggestion}`;
                }
                return `type ${parent.id.name} = ${suggestion}`;
            }
            return suggestion.endsWith(";")
                ? suggestion.slice(0, -1)
                : suggestion;
        }

        /**
         * @param {ESTreeNode} member The potential call signature being checked
         * @param {ESTreeNode} node The node being checked
         * @returns {void}
         */
        function checkMember(member, node) {
            if (
                util.esTreeNodeHasKind(member, ts.SyntaxKind.CallSignature) &&
                typeof member.typeAnnotation !== "undefined"
            ) {
                const suggestion = renderSuggestion(member, node);
                const fixStart = util.esTreeNodeHasKind(
                    node,
                    ts.SyntaxKind.TypeLiteral
                )
                    ? node.range[0]
                    : tsutils
                          .getChildOfKind(
                              context.parserServices.esTreeNodeToTSNodeMap.get(
                                  node
                              ),
                              ts.SyntaxKind.InterfaceKeyword
                          )
                          .getStart();

                context.report({
                    node: member,
                    message: failureMessage(
                        util.esTreeNodeHasKind(node, ts.SyntaxKind.TypeLiteral)
                            ? "Type literal"
                            : "Interface",
                        suggestion
                    ),
                    fix(fixer) {
                        return fixer.replaceTextRange(
                            [fixStart, node.range[1]],
                            suggestion
                        );
                    }
                });
            }
        }

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------

        return {
            /**
             * @param {ESTreeNode} node The node being checked
             * @returns {void}
             */
            TSInterfaceDeclaration(node) {
                if (noSupertype(node) && node.body.body.length === 1) {
                    checkMember(node.body.body[0], node);
                }
            },
            /**
             * Won't work until type annotations are visited
             * @param {ESTreeNode} node The node being checked
             * @returns {void}
             */
            TSTypeLiteralNode(node) {
                if (node.body.body.length === 1) {
                    checkMember(node.body.body[0], node);
                }
            }
        };
    }
};
