import type { CustomNode } from "@/ts/type";

export const addPositionParam = (nodes: CustomNode[]): CustomNode[] => {
  const positions: { [key: string]: number } = {};
  const defaultPosition = { x: 500, y: 0 };
  const defaultIncrement = { x: 0, y: 120 };
  const increment = 350; // Increment for the x position

  for (const node of nodes) {
    if (node.parentNode) {
      if (node.parentNode === "-1") {
        node.position = { ...defaultPosition };
      } else {
        // Check if there are other nodes with the same parent
        const siblings = nodes.filter((n) => n.parentNode === node.parentNode);
        if (siblings.length > 1) {
          // Assign negative and positive x values
          if (!(node.parentNode in positions)) {
            positions[node.parentNode] = -increment / siblings.length;
          } else {
            positions[node.parentNode] += increment;
          }
          node.position = {
            x: positions[node.parentNode],
            y: defaultIncrement.y,
          };
        } else {
          // Only one child, so assign the default positive x value
          node.position = { ...defaultIncrement };
        }
      }
    }
  }

  return nodes;
};
