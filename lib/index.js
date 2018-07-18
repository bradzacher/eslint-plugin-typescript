/**
 * @fileoverview TypeScript plugin for ESLint
 * @author Nicholas C. Zakas
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const requireIndex = require("requireindex");
const path = require("path");

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------
const plugins = ["typescript"];

module.exports = {
    configs: {
        loose: {
            plugins,
            rules: {
                "typescript/adjacent-overload-signatures": "warn",
                "typescript/class-name-casing": "warn",
                "typescript/explicit-function-return-type": [
                    "warn",
                    { allowExpressions: true }
                ],
                "typescript/explicit-member-accessibility": "warn",
                "typescript/interface-name-prefix": "off",
                "typescript/member-delimiter-style": "warn",
                "typescript/member-naming": "warn",
                "typescript/member-ordering": "warn",
                "typescript/no-angle-bracket-type-assertion": "off",
                "typescript/no-array-constructor": "warn",
                "typescript/no-empty-interface": "off",
                "typescript/no-explicit-any": "warn",
                "typescript/no-inferrable-types": "warn",
                "typescript/no-namespace": "warn",
                "typescript/no-non-null-assertion": "warn",
                "typescript/no-parameter-properties": "warn",
                "typescript/no-triple-slash-reference": "off",
                "typescript/no-type-alias": [
                    "warn",
                    {
                        allowAliases: "in-unions-and-intersections",
                        allowCallbacks: "always",
                        allowLiterals: "in-unions-and-intersections",
                        allowMappedTypes: "in-unions-and-intersections"
                    }
                ],
                "typescript/no-unused-vars": "warn",
                "typescript/no-use-before-define": [
                    "warn",
                    { typedefs: false }
                ],
                "typescript/no-var-requires": "off",
                "typescript/prefer-namespace-keyword": "off",
                "typescript/type-annotation-spacing": "warn"
            }
        },
        recommended: {
            plugins,
            rules: {
                "typescript/adjacent-overload-signatures": "error",
                "typescript/class-name-casing": "error",
                "typescript/explicit-function-return-type": [
                    "error",
                    { allowExpressions: true }
                ],
                "typescript/explicit-member-accessibility": "error",
                "typescript/interface-name-prefix": "warn",
                "typescript/member-delimiter-style": "error",
                "typescript/member-naming": "error",
                "typescript/member-ordering": "error",
                "typescript/no-angle-bracket-type-assertion": "warn",
                "typescript/no-array-constructor": "error",
                "typescript/no-empty-interface": "warn",
                "typescript/no-explicit-any": "error",
                "typescript/no-inferrable-types": "error",
                "typescript/no-namespace": "error",
                "typescript/no-non-null-assertion": "error",
                "typescript/no-parameter-properties": "error",
                "typescript/no-triple-slash-reference": "warn",
                "typescript/no-type-alias": [
                    "error",
                    {
                        allowAliases: "in-unions-and-intersections",
                        allowCallbacks: "always",
                        allowLiterals: "in-unions-and-intersections",
                        allowMappedTypes: "in-unions-and-intersections"
                    }
                ],
                "typescript/no-unused-vars": "error",
                "typescript/no-use-before-define": [
                    "error",
                    { typedefs: true }
                ],
                "typescript/no-var-requires": "warn",
                "typescript/prefer-namespace-keyword": "off",
                "typescript/type-annotation-spacing": "error"
            }
        },
        strict: {
            plugins,
            rules: {
                "typescript/adjacent-overload-signatures": "error",
                "typescript/class-name-casing": "error",
                "typescript/explicit-function-return-type": [
                    "error",
                    { allowExpressions: false }
                ],
                "typescript/explicit-member-accessibility": "error",
                "typescript/interface-name-prefix": "error",
                "typescript/member-delimiter-style": "error",
                "typescript/member-naming": "error",
                "typescript/member-ordering": "error",
                "typescript/no-angle-bracket-type-assertion": "error",
                "typescript/no-array-constructor": "error",
                "typescript/no-empty-interface": "error",
                "typescript/no-explicit-any": "error",
                "typescript/no-inferrable-types": [
                    "error",
                    {
                        ignoreProperties: true,
                        ignoreParameters: true
                    }
                ],
                "typescript/no-namespace": "error",
                "typescript/no-non-null-assertion": "error",
                "typescript/no-parameter-properties": "error",
                "typescript/no-triple-slash-reference": "error",
                "typescript/no-type-alias": [
                    "error",
                    {
                        allowAliases: "never",
                        allowCallbacks: "never",
                        allowLiterals: "never",
                        allowMappedTypes: "never"
                    }
                ],
                "typescript/no-unused-vars": "error",
                "typescript/no-use-before-define": [
                    "error",
                    { typedefs: true }
                ],
                "typescript/no-var-requires": "error",
                "typescript/prefer-namespace-keyword": "error",
                "typescript/type-annotation-spacing": "error"
            }
        }
    },
    // import all rules in lib/rules
    rules: requireIndex(path.join(__dirname, "rules"))
};
