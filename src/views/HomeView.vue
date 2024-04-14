<script setup lang="ts">
import { ref } from "vue";
import { VueFlow } from "@vue-flow/core";
import { Background } from "@vue-flow/background";
import { RectangleGroupIcon } from "@heroicons/vue/24/outline";

import AppButton from "@/components/base/AppButton.vue";
import {
  AddNodeModal,
  ConnectorNode,
  CustomNode,
  CustomEdge,
  Drawer,
} from "@/components/main";

import { useNodeStore } from "@/stores/nodes";
import { useEdgeStore } from "@/stores/edges";

const nodeStore = useNodeStore();
const nodes = ref(nodeStore.getNodes);

const edgeStore = useEdgeStore();
const edges = ref(edgeStore.getEdges);

const showAddNodeModal = ref(false);

const toggleAddNodeModal = () => {
  showAddNodeModal.value = !showAddNodeModal.value;
};
</script>

<template>
  <AddNodeModal :visible="showAddNodeModal" @close="toggleAddNodeModal" />
  <Drawer />
  <div class="h-full w-full px-20 py-12">
    <div class="flex flex-col gap-4">
      <div class="flex gap-2 items-center">
        <RectangleGroupIcon class="w-10 h-10 text-primary" />
        <h2>respond.flow</h2>
      </div>

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
          <template #node-dateTimeConnector="customNodeProps">
            <ConnectorNode v-bind="customNodeProps" />
          </template>
          <template #edge-custom="customEdgeProps">
            <CustomEdge v-bind="customEdgeProps" />
          </template>
        </VueFlow>
      </div>
    </div>
  </div>
</template>
