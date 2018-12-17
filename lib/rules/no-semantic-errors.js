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

        const program =
            context.parserServices && context.parserServices.program;

        if (!program) {
            return [];
        }

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
                        message: error.messageText,
                    });
                }
            },
        };
    },
};
