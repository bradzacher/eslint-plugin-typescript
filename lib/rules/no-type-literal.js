/**
 * @fileoverview Enforces the use of interfaces over type literals
 * @author Patricio Trevino
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "Enforces the use of interfaces over type literals.",
            category: "Style"
        },
        schema: [
            {
                type: "object",
                properties: {
                    allowUnion: {
                        type: "boolean"
                    },
                    allowIntersection: {
                        type: "boolean"
                    }
                },
                additionalProperties: false
            }
        ]
    },

    create: function(context) {
        var options = context.options[0];

        //----------------------------------------------------------------------
        // Private
        //----------------------------------------------------------------------

        /**
         * Gets the location of the VariableDeclaration node.
         * @param {ASTNode} node the node to be inspected.
         * @returns {Object} the location of the VariableDeclaration node or the location of the TSTypeLiteral
         *                    if no VariableDeclaration node can be found.
         * @private
         */
        function getVariableDeclarationLocation(node) {
            var current = node.parent;
            while (current && current.type !== "VariableDeclaration") {
                current = current.parent;
            }

            return current ? current.loc : node.loc;
        }

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------
        return {
            TSTypeLiteral: function(node) {
                if (options) {
                    var type = node.parent.type;
                    if ((type === "TSUnionType" && options.allowUnion) ||
                        (type === "TSIntersectionType" && options.allowIntersection)) {
                        return;
                    }
                }

                context.report({
                    node,
                    loc: getVariableDeclarationLocation(node),
                    message: "Use interfaces instead of type literals"
                });
            }
        };
    }
};
