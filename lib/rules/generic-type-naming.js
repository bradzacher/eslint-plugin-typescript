/**
 * @fileoverview Enforces naming of generic type variables.
 */
"use strict";

/**
 * Check type parameters for rule match.
 * @param {Array} typeParameters Nodes to be checked
 * @param {any} context          ESLint context
 * @param {Regex} regex          Rule name as regular expression
 * @param {any} rule             Rule name as string
 * @returns {void}
 */
function checkTypeParameters(typeParameters, context, regex, rule) {
    const params = typeParameters && typeParameters.params;

    if (!Array.isArray(params) || params.length === 0) {
        return;
    }
    params.forEach(node => {
        const type = node.type;

        if (type === "TSTypeParameter" || type === "TypeParameter") {
            const name = node.name;

            if (name && !regex.test(name)) {
                const data = { name, rule };

                context.report({ node, messageId: "nameRule", data });
            }
        }
    });
}

module.exports = {
    meta: {
        docs: {
            description: "Enforces naming of generic type variables",
            category: "TypeScript",
            url:
                "https://github.com/nzakas/eslint-plugin-typescript/blob/master/docs/rules/generic-type-naming.md"
        },
        messages: {
            nameRule: "Type parameter {{name}} does not match rule {{rule}}"
        }
    },

    create(context) {
        const rule = context.options[0] || "^[A-Z]+$";
        const regex = new RegExp(rule);

        return {
            VariableDeclarator: node =>
                checkTypeParameters(node.typeParameters, context, regex, rule),
            ClassDeclaration: node =>
                checkTypeParameters(node.typeParameters, context, regex, rule),
            InterfaceDeclaration: node =>
                checkTypeParameters(node.typeParameters, context, regex, rule),
            TSInterfaceDeclaration: node =>
                checkTypeParameters(node.typeParameters, context, regex, rule),
            FunctionDeclaration: node =>
                checkTypeParameters(node.typeParameters, context, regex, rule),
            TSCallSignature: node =>
                checkTypeParameters(node.typeParameters, context, regex, rule),
            CallSignature: node =>
                checkTypeParameters(node.typeParameters, context, regex, rule)
        };
    }
};
