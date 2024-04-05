<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { Elements } from "@vue-flow/core";
import { VueFlow } from "@vue-flow/core";

import { AppButton } from "@/components/base";
import AddNodeModal from "@/components/main/AddNodeModal.vue";

const elements = ref<Elements>([
  {
    id: "1",
    position: { x: 50, y: 50 },
    label: "Node 1",
  },
]);

onMounted(() => {
  elements.value.push({
    id: "2",
    label: "Node 2",
    position: { x: 150, y: 50 },
  });
});

const showAddNodeModal = ref(false);

const toggleAddNodeModal = () => {
  showAddNodeModal.value = !showAddNodeModal.value;
};
</script>

<template>
  <AddNodeModal :visible="showAddNodeModal" @close="toggleAddNodeModal" />
  <div class="h-full w-full px-28 py-16">
    <div class="flex flex-col gap-4">
      <h2>Easy flowchart</h2>
      <div class="w-full flex justify-end">
        <AppButton id="add-node" size="lg" @click="toggleAddNodeModal">
          Add Node
        </AppButton>
      </div>
      <div class="w-full h-[1000px]">
        <VueFlow v-model="elements" />
      </div>
    </div>
  </div>
</template>
