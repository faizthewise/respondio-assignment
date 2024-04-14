import type { CustomNode, CustomEdge } from "@/ts/type";

export const addPositionParam = (nodes: CustomNode[]): CustomNode[] => {
  const positions: { [key: string]: number } = {};
  const defaultPosition = { x: 500, y: 0 };
  const defaultIncrement = { x: 0, y: 150 };
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

export const addEdges = (nodes: CustomNode[]): CustomEdge[] => {
  const edges: CustomEdge[] = [];

  // Iterate through each node
  for (const node of nodes) {
    // Check if the node has a parentNode
    if (node.parentNode) {
      // Find the parent node by its id
      const parentNode = nodes.find((n) => n.id === node.parentNode);

      // If a parent node is found, create an edge
      if (parentNode) {
        edges.push({
          id: `${node.id}-${parentNode.id}`,
          source: parentNode.id,
          target: node.id,
          type: "smoothstep",
        });
      }
    }
  }

  return edges;
};
