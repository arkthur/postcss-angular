import { stringify as postcssStringify, AnyNode } from "postcss";
import { logger } from "./logger";

export const stringify = (node: AnyNode, builder) => {
  logger.info(`Stringify called.`);

  try {
    const root = node.root();
    const nodes = root.nodes;

    if (nodes.length === 0) {
      // No inline styles — return the original TypeScript source unchanged to
      // prevent stylelint's fix mode from writing an empty string back to disk.
      builder(root.raws.angularSource ?? "");
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
