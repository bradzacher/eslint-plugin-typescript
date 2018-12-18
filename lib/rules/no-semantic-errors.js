/**
 * @fileoverview Enforces that there is no semantic and syntactic errors
 * @author Armano <https://github.com/armano2>
 */
"use strict";

const util = require("../util");

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        type: "problem",
        docs: {
            description:
                "Enforces that there is no semantic and syntactic errors",
            category: "TypeScript",
            url: util.metaDocsUrl("no-semantic-errors"),
        },
        schema: [],
    },

    create(context) {
        const sourceCode = context.getSourceCode();

        const program = util.getParserServices(context).program;

        return {
            Program(node) {
                const semantic = program.getSemanticDiagnostics() || [];
                const syntactic = program.getSyntacticDiagnostics() || [];

                const errors = semantic
                    .concat(syntactic)
                    // DiagnosticCategory.Error = 1,
                    .filter(error => error.category === 1);

                for (const error of errors) {
                    const errorNode = error.start
                        ? sourceCode.getNodeByRangeIndex(error.start)
                        : node;

                    context.report({
                        node: errorNode,
                        message:
                            typeof error.messageText === "object"
                                ? error.messageText.messageText
                                : error.messageText,
                    });
                }
            },
        };
    },
};
