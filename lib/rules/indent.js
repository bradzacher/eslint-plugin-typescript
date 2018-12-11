/**
 * @fileoverview Rule to flag non-camelcased identifiers
 * @author Patricio Trevino
 */
"use strict";

const baseRule = require("eslint/lib/rules/indent");

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const KNOWN_NODES = new Set([
    // ts specific nodes we want to support
    "TSTypeLiteral",
    "TSPropertySignature",
]);

module.exports = Object.assign({}, baseRule, {
    create(context) {
        const rules = baseRule.create(context);

        /**
         * Converts from a TSPropertySignature to a Property
         * @param {Object} node a TSPropertySignature node
         * @returns {Object} a Property node
         */
        function TSPropertySignatureToProperty(node) {
            return {
                type: "Property",
                key: node.key,
                value: node.typeAnnotation,

                // Property flags
                computed: false,
                method: false,
                kind: "init",
                // this will stop eslint from interrogating the type literal
                shorthand: true,

                // location data
                range: node.range,
                loc: node.loc,
            };
        }

        return Object.assign({}, rules, {
            // overwrite the base rule here so we can use our KNOWN_NODES list instead
            "*:exit"(node) {
                // For nodes we care about, skip the default handling, because it just marks the node as ignored...
                if (!KNOWN_NODES.has(node.type)) {
                    rules["*:exit"](node);
                }
            },

            TSTypeLiteral(node) {
                // transform it to an ObjectExpression so the indent rule can understand it
                return rules["ObjectExpression, ObjectPattern"]({
                    type: "ObjectExpression",
                    properties: node.members.map(TSPropertySignatureToProperty),

                    // location data
                    range: node.range,
                    loc: node.loc,
                });
            },

            // specifically use TSInterfaceBody instead of TSInterfaceDeclaration,
            // because it matches ObjectExpression (i.e. is curly brace to curly brace)
            TSInterfaceBody(node) {
                return rules["ObjectExpression, ObjectPattern"]({
                    type: "ObjectExpression",
                    properties: node.body.map(TSPropertySignatureToProperty),

                    // location data
                    range: node.range,
                    loc: node.loc,
                });
            },
        });
    },
});
