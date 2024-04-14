<script setup lang="ts">
import type { NodeProps } from "@vue-flow/core";
import type { NodeCustomData } from "@/ts/interface";

defineProps<NodeProps<NodeCustomData>>();
</script>

<template>
  <div class="border rounded-lg bg-primary-low w-[250px]">
    <div class="flex items-center gap-2 px-8 py-2">
      <p class="font-medium text-black text-center w-full">{{ data.title }}</p>
    </div>
  </div>
</template>
