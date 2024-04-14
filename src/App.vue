<script setup lang="ts">
import { onMounted, ref } from "vue";
import { RouterView } from "vue-router";

import { useNodeStore } from "@/stores/nodes";
import { useEdgeStore } from "@/stores/edges";

const nodeStore = useNodeStore();
const edgeStore = useEdgeStore();

onMounted(() => {
  nodeStore.initNodes();
  edgeStore.initEdges();
});
</script>

<template>
  <div class="min-h-screen overflow-hidden bg-surface text-body font-display">
    <RouterView />
  </div>
</template>

<style scoped></style>
