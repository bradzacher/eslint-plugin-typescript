/**
 * @fileoverview Enforces a member delimiter style in interfaces and type literals.
 * @author Patricio Trevino
 * @author Brad Zacher
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const definition = {
    type: "object",
    properties: {
        delimiter: { enum: ["none", "semi", "comma"] },
        requireLast: { type: "boolean" },
        singleLine: { enum: ["none", "semi", "comma"] },
    },
    additionalProperties: false,
};

const errorMessages = {
    unexpected: {
        comma: "Unexpected separator (,).",
        semi: "Unexpected separator (;).",
    },
    expected: {
        comma: "Expected a comma.",
        semi: "Expected a semicolon.",
    },
};

module.exports = {
    meta: {
        docs: {
            description:
                "Require a specific member delimiter style for interfaces and type literals",
            category: "TypeScript",
            url:
                "https://github.com/nzakas/eslint-plugin-typescript/blob/master/docs/rules/member-delimiter-style.md",
        },
        fixable: "code",
        schema: [
            {
                type: "object",
                properties: Object.assign({}, definition.properties, {
                    overrides: {
                        type: "object",
                        properties: {
                            interface: definition,
                            typeLiteral: definition,
                        },
                        additionalProperties: false,
                    },
                }),
                additionalProperties: false,
            },
        ],
    },

    create(context) {
        const sourceCode = context.getSourceCode();
        const options = context.options[0] || {};

        const overrides = options.overrides || {};
        const defaults = {
            delimiter: "semi",
            requireLast: true,
            singleLine: "semi",
        };

        const interfaceOptions = Object.assign(
            {},
            defaults,
            options,
            overrides.interface
        );
        const typeLiteralOptions = Object.assign(
            {},
            defaults,
            options,
            overrides.typeLiteral
        );

        //----------------------------------------------------------------------
        // Helpers
        //----------------------------------------------------------------------

        /**
         * Check the last token in the given member.
         * @param {ASTNode} member the member to be evaluated.
         * @param {Object} opts the options to be validated.
         * @param {boolean} isLast a flag indicating `member` is the last in the
         *                         interface or type literal.
         * @param {boolean} isSameLine a flag indicating the interface or type
         *                             literal was declared in a single line.
         * @returns {void}
         * @private
         */
        function checkLastToken(member, opts, isLast, isSameLine) {
            /**
             * Resolves the boolean value for the given setting enum value
             * @param {"semi" | "comma" | "none"} type the option name
             * @returns {boolean} the resolved value
             */
            function getOption(type) {
                // eslint-disable-next-line require-jsdoc
                function getValue() {
                    if (isSameLine) {
                        return opts.singleLine === type;
                    }
                    return opts.delimiter === type;
                }

                if (isLast) {
                    if (opts.requireLast) {
                        return getValue();
                    }
                    return type === "none";
                }

                return getValue();
            }

            let message;
            let missingDelimiter = false;
            const lastToken = sourceCode.getLastToken(member, {
                includeComments: false,
            });

            const optsSemi = getOption("semi");
            const optsComma = getOption("comma");
            const optsNone = getOption("none");

            if (lastToken.value === ";") {
                if (optsComma) {
                    message = errorMessages.expected.comma;
                } else if (optsNone) {
                    missingDelimiter = true;
                    message = errorMessages.unexpected.semi;
                }
            } else if (lastToken.value === ",") {
                if (optsSemi) {
                    message = errorMessages.expected.semi;
                } else if (optsNone) {
                    missingDelimiter = true;
                    message = errorMessages.unexpected.comma;
                }
            } else {
                if (optsSemi) {
                    missingDelimiter = true;
                    message = errorMessages.expected.semi;
                } else if (optsComma) {
                    missingDelimiter = true;
                    message = errorMessages.expected.comma;
                }
            }

            if (message) {
                context.report({
                    node: lastToken,
                    loc: {
                        start: {
                            line: lastToken.loc.end.line,
                            column: lastToken.loc.end.column,
                        },
                        end: {
                            line: lastToken.loc.end.line,
                            column: lastToken.loc.end.column,
                        },
                    },
                    message,
                    fix(fixer) {
                        if (optsNone) {
                            // remove the unneeded token
                            return fixer.remove(lastToken);
                        }

                        const token = optsSemi ? ";" : ",";

                        if (missingDelimiter) {
                            // add the missing delimiter
                            return fixer.insertTextAfter(lastToken, token);
                        }

                        // correct the current delimiter
                        return fixer.replaceText(lastToken, token);
                    },
                });
            }
        }

        /**
         * Check the member separator being used matches the delimiter.
         * @param {ASTNode} node the node to be evaluated.
         * @returns {void}
         * @private
         */
        function checkMemberSeparatorStyle(node) {
            const isInterface = node.type === "TSInterfaceBody";

            const isSingleLine = node.loc.start.line === node.loc.end.line;
            const opts = isInterface ? interfaceOptions : typeLiteralOptions;
            const members = isInterface ? node.body : node.members;

            members.forEach((member, index) => {
                checkLastToken(
                    member,
                    opts,
                    index === members.length - 1,
                    isSingleLine
                );
            });
        }

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------

        return {
            TSInterfaceBody: checkMemberSeparatorStyle,
            TSTypeLiteral: checkMemberSeparatorStyle,
        };
    },

    errorMessages,
};
