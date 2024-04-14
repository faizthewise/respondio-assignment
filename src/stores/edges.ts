import { defineStore } from "pinia";

import type { CustomEdge } from "@/ts/type";

import { addEdges } from "@/utils"; // Import utility function to generate edges
import nodesData from "@/data/nodes.json"; // Import nodes data

// Define the store
export const useEdgeStore = defineStore("edge", {
  state: () => ({
    edges: [] as CustomEdge[], // Define state for edges
  }),

  getters: {
    getEdges(): CustomEdge[] {
      // Getter to retrieve edges
      return this.edges;
    },
  },

  actions: {
    initEdges(): void {
      // Action to initialize edges
      // Call utility function to generate edges based on node relationships
      this.edges = addEdges(nodesData);
    },
  },
});
