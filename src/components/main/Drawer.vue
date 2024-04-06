<script lang="ts" setup>
import { defineProps, computed, watch, ref } from "vue";
import {
  XMarkIcon,
  EllipsisHorizontalCircleIcon,
} from "@heroicons/vue/24/outline";
import { useRouter, useRoute } from "vue-router";

import { useNodeStore } from "@/stores/nodes";

import type { CustomNode } from "@/ts/type";

const route = useRoute();
const showDrawer = ref(false);

const nodeStore = useNodeStore();
const nodeDetail = ref<CustomNode>();

const selectedNodeId = computed(() => {
  return route.params?.node_id?.toString();
});

watch(
  selectedNodeId,
  (newNodeId, oldNodeId) => {
    if (!newNodeId) {
      //selectedNodeId has no value
      showDrawer.value = false;
      return;
    }

    nodeDetail.value = nodeStore.getNodeById(newNodeId);

    if (showDrawer.value === true && newNodeId !== oldNodeId) {
      // Change from one node to another node
      showDrawer.value = false;
      setTimeout(() => {
        showDrawer.value = true;
      }, 500);
    } else if (newNodeId !== oldNodeId) {
      showDrawer.value = !!newNodeId;
    }
  },
  { immediate: true }
);

const width = computed(() => {
  return showDrawer.value ? "w-2/5" : "w-0";
});

const router = useRouter();
const close = () => {
  router.push("/");
};

const displayActions = ref(false);
const toggleDisplayAction = () => {
  displayActions.value = !displayActions.value;
};

const deleteNode = () => {
  console.log("deleteNode ", nodeDetail.value.id);
  nodeStore.removeNode(nodeDetail.value.id as string);
  toggleDisplayAction();
  close();
};

const updateNode = () => {
  const updatedNode = {
    ...nodeDetail.value,
    data: { title: "tukar", description: "tukar" },
  };

  console.log("updatedNode ", updatedNode);

  nodeStore.updateNode(updatedNode as CustomNode);
  console.log("nodes ", nodeStore.getNodeById("3"));

  toggleDisplayAction();
  close();
};
</script>

<template>
  <div
    :class="[
      width,
      'h-screen bg-surface-low z-10 absolute right-0 transition-all duration-200 ease-in',
    ]"
  >
    <div class="w-full h-full relative overflow-hidden flex flex-col pt-8 px-6">
      <div class="flex flex-col gap-3 mb-6">
        <div class="flex justify-between items-center">
          <h3>{{ nodeDetail?.data?.title }}</h3>
          <EllipsisHorizontalCircleIcon
            class="w-6 h-6 hover:cursor-pointer hover:text-white"
            @click="toggleDisplayAction"
          />
          <div
            v-if="displayActions"
            class="absolute bg-gray-500 right-10 top-16 flex flex-col"
          >
            <buttton :class="$style.button" @click="updateNode">Edit</buttton>
            <button :class="$style.button" @click="deleteNode">Delete</button>
          </div>
        </div>
        <p class="text-sm">{{ nodeDetail?.data?.description }}</p>
      </div>

      <div class="h-[2px] bg-white w-full"></div>
    </div>
  </div>
</template>

<style lang="postcss" module>
.button {
  @apply min-w-[150px] py-2 text-center text-white hover:cursor-pointer hover:bg-blue-950;
}
</style>
