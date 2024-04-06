import { defineStore } from "pinia";
// import { useVueFlow } from "@vue-flow/core";

import type { CustomNode } from "@/ts/type";
import type { SendMessagePayload } from "@/ts/interface";
import { NodeTypes } from "@/constants";

const { sendMessage, businessHours, addComment, trigger } = NodeTypes;

// const { addNodes, removeNodes } = useVueFlow();

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
          payload: [
            {
              type: "text",
              text: "Hello there welcome to the chat!",
            },
            {
              type: "attachment",
              attachment:
                "https://fastly.picsum.photos/id/396/536/354.jpg?hmac=GmUosOuXb6nGkFhmTE-83i0ciQcaleMyvIyqzeFbW58",
            },
          ],
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
    getNodeById:
      (state) =>
      (id: string): CustomNode | undefined => {
        return state.nodes.find((node) => node.id === id);
      },
  },

  actions: {
    addNode(node: CustomNode): void {
      console.log("add");
      this.nodes.push(node);
    },
    addPayloadToNode(
      payloadItem: { type: string; text?: string; attachment?: string },
      nodeId: string
    ): void {
      const node = this.getNodeById(nodeId);
      if (node) {
        // Modify the payload array by adding the new payloadItem
        node.data?.payload?.push(payloadItem);
        // Update the node in the store
        this.updateNode(node);
      }
    },

    removeNode(nodeId: string): void {
      const index = this.nodes.findIndex((node) => node.id === nodeId);
      if (index !== -1) {
        this.nodes.splice(index, 1);
      }
    },

    deletePayloadFromNode(payloadIndex: number, nodeId: string): void {
      const node = this.getNodeById(nodeId);
      if (node?.data?.payload && node.data.payload.length > payloadIndex) {
        // Modify the payload array by removing the payload at the specified index
        node?.data?.payload?.splice(payloadIndex, 1);
        // Update the node in the store
        this.updateNode(node);
      }
    },

    updateNode(updatedNode: CustomNode): void {
      const index = this.nodes.findIndex((node) => node.id === updatedNode.id);

      if (index !== -1) {
        this.nodes.splice(index, 1);
        setTimeout(() => {
          this.nodes.push(updatedNode);
        }, 100);
      }
    },

    updatePayloadItem(
      nodeId: string,
      payloadIndex: number,
      updatedItem: SendMessagePayload
    ): void {
      const node = this.nodes.find((node) => node.id === nodeId);
      if (node) {
        const payload = node?.data?.payload;
        if (payload && payloadIndex >= 0 && payloadIndex < payload.length) {
          payload[payloadIndex] = updatedItem;
        }
      }
    },
  },
});
