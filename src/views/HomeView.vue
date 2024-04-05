<script setup lang="ts">
import { ref } from "vue";
import { VueFlow, useVueFlow } from "@vue-flow/core";
import { Background } from "@vue-flow/background";

import AppButton from "@/components/base/AppButton.vue";
import AddNodeModal from "@/components/main/AddNodeModal.vue";
import CustomNode from "@/components/nodes/CustomNode.vue";

import { CustomData, CustomEvents } from "@/ts/interface";

const { addNodes, removeNodes } = useVueFlow();

const nodes = ref<CustomNode[]>([
  {
    id: "1",
    type: "sendMessage",
    position: { x: 50, y: 50 },
    data: {
      title: "Node 1",
      description: "Hahahaha",
    },
  },
  {
    id: "2",
    label: "Node 2",
    type: "trigger",
    data: {
      title: "Node 2",
      description: "Hihuhihu",
    },
    position: { x: 50, y: 200 },
  },
]);

const onAddNode = ({
  title,
  description,
  type,
}: {
  title: string;
  description: string;
  type: string;
}) => {
  const id = generateUniqueId();
  const information = {
    id: id,
    position: { x: Math.random() * 500, y: Math.random() * 500 },
    type,
    data: {
      title,
      description,
    },
  };
  addNodes(information);
};

const onRemoveNode = (id: string) => {
  removeNodes(id);
};

function generateUniqueId(): string {
  return Math.random().toString();
}

const showAddNodeModal = ref(false);

const toggleAddNodeModal = () => {
  showAddNodeModal.value = !showAddNodeModal.value;
};
</script>

<template>
  <AddNodeModal
    :visible="showAddNodeModal"
    @close="toggleAddNodeModal"
    @add="onAddNode"
  />
  <div class="h-full w-full px-28 py-16">
    <div class="flex flex-col gap-4">
      <h2>Easy flowchart</h2>
      <div class="w-full flex justify-end">
        <AppButton id="add-node" size="lg" @click="toggleAddNodeModal">
          Add Node
        </AppButton>
      </div>
      <div class="w-full h-[1000px]">
        <VueFlow :nodes="nodes">
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
        </VueFlow>
      </div>
    </div>
  </div>
</template>
