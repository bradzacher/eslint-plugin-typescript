/**
 * @fileoverview Disallows the use of internal modules and namespaces.
 * @author Patricio Trevino
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "Disallows the use of internal modules and namespaces.",
            category: "TypeScript"
        },
        schema: [
            {
                type: "object",
                properties: {
                    allowDeclarations: {
                        type: "boolean"
                    },
                    allowLegacyExternalModules: {
                        type: "boolean"
                    }
                },
                additionalProperties: false
            }
        ]
    },

    create: function(context) {

        var allowDeclarations = context.options[0] ? context.options[0].allowDeclarations : true;
        var allowLegacyExternalModules = context.options[0] ? context.options[0].allowLegacyExternalModules : false;

        //----------------------------------------------------------------------
        // Helpers
        //----------------------------------------------------------------------

        /**
         * Determines if node is a legacy external module declaration (instead of a namespace).
         * @param {ASTNode} node the node to be evaluated.
         * @returns {boolean} true when node is an external declaration.
         * @private
         */
        function isLegacyExternalModule(node) {
            return node.name && node.name.type === "Literal";
        }

        /**
         * Determines if node is either a declaration or is part of a declaration file (d.ts).
         * @param {ASTNode} node the node to be evaluated.
         * @returns {boolean} true when dealing with declarations.
         * @private
         */
        function isDeclaration(node) {
            var hasModifier = (node.modifiers || []).filter(m => m.type === "TSDeclareKeyword").length > 0;

            var isDeclarationFile = false;
            var filename = context.getFilename();
            if (filename) {
                isDeclarationFile = filename.slice(-4).toLowerCase() === "d.ts";
            }

            return isDeclarationFile || (hasModifier && !isLegacyExternalModule(node));
        }

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------
        return {
            TSModuleDeclaration: function(node) {
                var isExternalModule = isLegacyExternalModule(node);
                if ((allowLegacyExternalModules && isExternalModule) || (allowDeclarations && isDeclaration(node))) {
                    return;
                }

                context.report({
                    node,
                    message: isExternalModule
                        ? "ES2015 external modules syntax is preferred over legacy external modules"
                        : "ES2015 external modules syntax is preferred over internal modules and namespaces"
                });
            }
        };
    }
};
