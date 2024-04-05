<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { Elements } from "@vue-flow/core";
import type { Node } from "@vue-flow/core";
import { VueFlow, useVueFlow } from "@vue-flow/core";
import { Background } from "@vue-flow/background";

import { AppButton } from "@/components/base";
import AddNodeModal from "@/components/main/AddNodeModal.vue";

const initialNodes = ref<Node[]>([
  {
    id: "1",
    position: { x: 50, y: 50 },
    label: "Node 1",
    data: {},
  },
]);
const { addNodes } = useVueFlow();

const onAddNode = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  const id = generateUniqueId();
  const information = {
    id: id,
    position: { x: Math.random() * 500, y: Math.random() * 500 },

    data: {
      label: title,
      hello: description,
    },
  };
  // add a single node to the graph
  addNodes(information);
};

function generateUniqueId(): string {
  // Generate a unique id using a library or custom logic
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
        <VueFlow :node="initialNodes">
          <Background />
        </VueFlow>
      </div>
    </div>
  </div>
</template>
