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
    // Class properties aren't yet supported by eslint...
    "ClassProperty",
    // ts specific nodes we want to support
    "TSAbstractClassDeclaration",
    "TSAbstractClassProperty",
    "TSEnumDeclaration",
    "TSEnumMember",
    "TSExportAssignment",
    "TSImportEqualsDeclaration",
    "TSPropertySignature",
    "TSTypeLiteral",
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

            "TSTypeLiteral, TSEnumDeclaration"(node) {
                // transform it to an ObjectExpression
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
                // transform it to an ObjectExpression
                return rules["ObjectExpression, ObjectPattern"]({
                    type: "ObjectExpression",
                    properties: node.body.map(TSPropertySignatureToProperty),

                    // location data
                    range: node.range,
                    loc: node.loc,
                });
            },

            TSImportEqualsDeclaration(node) {
                // transform it to an VariableDeclaration
                // use VariableDeclaration instead of ImportDeclaration because it's essentially the same thing
                const { name, moduleReference } = node;

                return rules.VariableDeclaration({
                    type: "VariableDeclaration",
                    declarations: [
                        {
                            type: "VariableDeclarator",
                            range: [name.range[0], moduleReference.range[1]],
                            loc: {
                                start: name.loc.start,
                                end: moduleReference.loc.end,
                            },
                            id: name,
                            init: {
                                type: "CallExpression",
                                callee: {
                                    type: "Identifier",
                                    name: "require",
                                    range: [
                                        moduleReference.range[0],
                                        moduleReference.range[0] +
                                            "require".length,
                                    ],
                                    loc: {
                                        start: moduleReference.loc.start,
                                        end: {
                                            line: moduleReference.loc.end.line,
                                            column:
                                                moduleReference.loc.start +
                                                "require".length,
                                        },
                                    },
                                },
                                arguments: [moduleReference.expression],

                                // location data
                                range: moduleReference.range,
                                loc: moduleReference.loc,
                            },
                        },
                    ],

                    // location data
                    range: node.range,
                    loc: node.loc,
                });
            },
        });
    },
});
