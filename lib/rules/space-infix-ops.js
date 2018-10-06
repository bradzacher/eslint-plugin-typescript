/**
 * @fileoverview Require spaces around infix operators
 * @author Michael Ficarra
 * @author Bence Dányi
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description:
                "Require spacing around infix operators in TypeScript-specific constructs (to be used in tandem with the code `space-infix-ops` rule)",
            category: "Stylistic Issues",
            recommended: false,
            url:
                "https://github.com/nzakas/eslint-plugin-typescript/blob/master/docs/rules/space-infix-ops.md"
        },
        fixable: "whitespace"
    },

    create(context) {
        const sourceCode = context.getSourceCode();

        /**
         * Returns the first token which violates the rule
         * @param {ASTNode} left - The left node of the main node
         * @param {ASTNode} right - The right node of the main node
         * @returns {Object} The violator token or null
         * @private
         */
        function getFirstNonSpacedToken(left, right) {
            const tokens = sourceCode.getTokensBetween(left, right, 1);

            for (let i = 1, l = tokens.length - 1; i < l; ++i) {
                const op = tokens[i];

                if (
                    op.type === "Punctuator" &&
                    op.value === "=" &&
                    (tokens[i - 1].range[1] >= op.range[0] ||
                        op.range[1] >= tokens[i + 1].range[0])
                ) {
                    return op;
                }
            }
            return null;
        }

        /**
         * Reports an AST node as a rule violation
         * @param {ASTNode} mainNode - The node to report
         * @param {Object} culpritToken - The token which has a problem
         * @returns {void}
         * @private
         */
        function report(mainNode, culpritToken) {
            context.report({
                node: mainNode,
                loc: culpritToken.loc.start,
                message: "Infix operators must be spaced.",
                fix(fixer) {
                    const previousToken = sourceCode.getTokenBefore(
                        culpritToken
                    );
                    const afterToken = sourceCode.getTokenAfter(culpritToken);
                    let fixString = "";

                    if (culpritToken.range[0] - previousToken.range[1] === 0) {
                        fixString = " ";
                    }

                    fixString += culpritToken.value;

                    if (afterToken.range[0] - culpritToken.range[1] === 0) {
                        fixString += " ";
                    }

                    return fixer.replaceText(culpritToken, fixString);
                }
            });
        }

        /**
         * Check if the node is a type alias
         * @param {ASTNode} node node to evaluate
         * @returns {void}
         * @private
         */
        function checkAlias(node) {
            if (node.parent.kind !== "type") return;
            const leftNode = node.typeParameters
                ? node.typeParameters
                : node.id;
            const rightNode = node.init;
            const nonSpacedNode = getFirstNonSpacedToken(leftNode, rightNode);

            if (nonSpacedNode) {
                report(node, nonSpacedNode);
            }
        }

        return {
            VariableDeclarator: checkAlias
        };
    }
};
