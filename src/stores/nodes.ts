import { defineStore } from "pinia";

import { addPositionParam } from "@/utils";
import nodesData from "@/data/nodes.json";

import type { CustomNode } from "@/ts/type";
import type { SendMessagePayload } from "@/ts/interface";
import type { BusinessHoursTimes } from "./../ts/interface";

export const useNodeStore = defineStore("node", {
  state: () => ({
    nodes: [] as CustomNode[],
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
    initNodes(): void {
      this.nodes = addPositionParam(nodesData);
    },
    addNode(node: CustomNode): void {
      this.nodes.push(node);
    },
    addPayloadToNode(
      payloadItem: { type: string; text?: string; attachment?: string },
      nodeId: string
    ): void {
      const node = this.getNodeById(nodeId);
      if (node) {
        node.data?.payload?.push(payloadItem);
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
        node?.data?.payload?.splice(payloadIndex, 1);
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
    updateComment(nodeId: string, newComment: string): void {
      const node = this.nodes.find((node) => node.id === nodeId);
      if (node?.data) {
        node.data.comment = newComment;
      }
    },
    deleteComment(nodeId: string): void {
      const node = this.nodes.find((node) => node.id === nodeId);

      if (node && node.data) {
        delete node.data.comment;
      }
    },
    updateTime(
      nodeId: string,
      newTimezone: string,
      newTimes: BusinessHoursTimes[]
    ): void {
      const nodeIndex = this.nodes.findIndex((node) => node.id === nodeId);

      if (nodeIndex !== -1) {
        const updatedNode = { ...this.nodes[nodeIndex] };

        if (updatedNode.data) {
          updatedNode.data.timezone = newTimezone;
          updatedNode.data.times = newTimes;
        }

        this.nodes.splice(nodeIndex, 1, updatedNode);
      }
    },
  },
});
