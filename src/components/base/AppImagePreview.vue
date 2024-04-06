<script setup lang="ts">
defineProps({
  src: {
    type: String,
    default: "",
  },
  alt: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <div class="rounded-lg overflow-hidden w-[300px] h-max p-2 bg-white">
    <img :alt="alt" :src="src" class="h-full w-full" />
  </div>
</template>
