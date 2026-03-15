"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringify = void 0;
const postcss_1 = require("postcss");
const logger_1 = require("./logger");
const stringify = (node, builder) => {
    logger_1.logger.info(`Stringify called.`);
    try {
        const root = node.root();
        const nodes = root.nodes;
        if (nodes.length === 0) {
            // No inline styles — return the original TypeScript source unchanged
            // to prevent stylelint's fix mode from writing an empty string back
            // to disk.
            builder(root.raws.angularSource ?? "");
            return;
        }
        nodes.forEach((node) => {
            builder(node.raws.angularCodeBefore, node);
            (0, postcss_1.stringify)(node, builder);
            builder(node.raws.angularCodeAfter, node);
        });
    }
    catch (e) {
        logger_1.logger.error(e);
    }
};
exports.stringify = stringify;
