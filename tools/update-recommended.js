"use strict";

const path = require("path");
const fs = require("fs");
const requireIndex = require("requireindex");

const bannedRecommendedRules = new Set(["camelcase", "indent"]);

/**
 * Generate recommended configuration
 * @returns {void}
 */
function generate() {
    // replace this with Object.entries when node > 8
    const allRules = requireIndex(path.resolve(__dirname, "../lib/rules"));
    const rules = Object.keys(allRules)
        .filter(key => allRules[key].meta.docs.recommended)
        .reduce((config, key) => {
            // having this here is just for output niceness (the keys will be ordered)
            if (bannedRecommendedRules.has(key)) {
                config[key] = "off";
            }

            config[`typescript/${key}`] = allRules[key].meta.docs.recommended;
            return config;
        }, {});

    const filePath = path.resolve(__dirname, "../lib/configs/recommended.json");

    const recommendedConfig = {
        parser: "eslint-plugin-typescript/parser",
        parserOptions: {
            sourceType: "module",
        },
        plugins: ["typescript"],
        rules,
    };

    fs.writeFileSync(
        filePath,
        `${JSON.stringify(recommendedConfig, null, 4)}\n`
    );
}

generate();
