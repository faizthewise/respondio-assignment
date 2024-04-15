import { defineStore } from "pinia";
import { addEdges } from "@/utils";
import nodesData from "@/data/nodes.json";

import type { CustomEdge } from "@/ts/type";

export const useEdgeStore = defineStore("edge", {
  state: () => ({
    edges: [] as CustomEdge[],
  }),

  getters: {
    getEdges(): CustomEdge[] {
      return this.edges;
    },
  },

  actions: {
    initEdges(): void {
      this.edges = addEdges(nodesData);
    },
  },
});
