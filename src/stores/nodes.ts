import { defineStore } from "pinia";

import type { CustomNode } from "@/ts/type";
import { NodeTypes } from "@/constants";

const { sendMessage, businessHours, addComment, trigger } = NodeTypes;

export const useNodeStore = defineStore("node", {
  state: () => ({
    nodes: [
      {
        id: "1",
        type: trigger,
        position: { x: 50, y: 50 },
        data: {
          title: "Trigger",
          description: "Hehehe",
        },
      },
      {
        id: "2",
        type: sendMessage,
        position: { x: 50, y: 150 },
        data: {
          title: "Send Message",
          description: "Hehehe",
        },
      },
      {
        id: "3",
        type: addComment,
        position: { x: 50, y: 250 },
        data: {
          title: "Add comment",
          description: "Hehehe",
        },
      },
      {
        id: "4",
        type: businessHours,
        position: { x: 50, y: 350 },
        data: {
          title: "Business Hours",
          description: "Hehehe",
        },
        parentNode: "-1",
      },
    ] as CustomNode[],
  }),

  getters: {
    getNodes(): CustomNode[] {
      return this.nodes;
    },
  },

  actions: {
    addNode(node: CustomNode): void {
      this.nodes.push(node);
    },

    removeNode(nodeId: string): void {
      this.nodes = this.nodes.filter((node) => node.id !== nodeId);
    },

    updateNode(updatedNode: CustomNode): void {
      const index = this.nodes.findIndex((node) => node.id === updatedNode.id);
      if (index !== -1) {
        this.nodes[index] = updatedNode;
      }
    },
  },
});
