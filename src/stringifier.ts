import { stringify as postcssStringify, AnyNode } from "postcss";
import { logger } from "./logger";

export const stringify = (node: AnyNode, builder) => {
  logger.info(`Stringify called.`);

  try {
    const nodes = node.root().nodes;

    if (nodes.length === 0) {
      // No inline styles — return original source unchanged to prevent
      // stylelint's fix mode from writing an empty string back to disk.
      builder(node.source?.input?.css ?? "");
      return;
    }

    nodes.forEach((node) => {
      builder(node.raws.angularCodeBefore, node);
      postcssStringify(node, builder);
      builder(node.raws.angularCodeAfter, node);
    });
  } catch (e) {
    logger.error(e);
  }
};
