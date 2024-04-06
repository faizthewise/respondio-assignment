<script setup lang="ts">
import { ref } from "vue";
import type { Edge } from "@vue-flow/core";
import { VueFlow } from "@vue-flow/core";
import { Background } from "@vue-flow/background";

import AppButton from "@/components/base/AppButton.vue";
import {
  AddNodeModal,
  CustomNode,
  CustomEdge,
  Drawer,
} from "@/components/main";
import { useNodeStore } from "@/stores/nodes";

import type { EdgeCustomData } from "@/ts/interface";

const nodeStore = useNodeStore();
const nodes = ref(nodeStore.getNodes);

const showAddNodeModal = ref(false);

const toggleAddNodeModal = () => {
  showAddNodeModal.value = !showAddNodeModal.value;
};

type CustomEdgeTypes = "custom" | "special";

type CustomEdge = Edge<EdgeCustomData, any, CustomEdgeTypes>;

const edges = ref<CustomEdge[]>([
  {
    id: "el1-2",
    source: "1",
    target: "2",
    type: "custom",
  },
]);
</script>

<template>
  <AddNodeModal :visible="showAddNodeModal" @close="toggleAddNodeModal" />
  <Drawer />
  <div class="h-full w-full px-28 py-16">
    <div class="flex flex-col gap-4">
      <h2>Easy flowchart</h2>
      <div class="w-full flex justify-end">
        <AppButton id="add-node" size="lg" @click="toggleAddNodeModal">
          Add Node
        </AppButton>
      </div>
      <div class="w-full h-[1000px]">
        <VueFlow :nodes="nodes" :edges="edges">
          <Background />
          <template #node-sendMessage="customNodeProps">
            <CustomNode v-bind="customNodeProps" />
          </template>
          <template #node-trigger="customNodeProps">
            <CustomNode v-bind="customNodeProps" />
          </template>
          <template #node-businessHours="customNodeProps">
            <CustomNode v-bind="customNodeProps" />
          </template>
          <template #node-addComment="customNodeProps">
            <CustomNode v-bind="customNodeProps" />
          </template>
          <template #edge-custom="customEdgeProps">
            <CustomEdge v-bind="customEdgeProps" />
          </template>
        </VueFlow>
      </div>
    </div>
  </div>
</template>
