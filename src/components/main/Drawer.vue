<script lang="ts" setup>
import { defineProps, computed } from "vue";
import { XMarkIcon } from "@heroicons/vue/24/outline";
import { useRouter } from "vue-router";

// import { NodeCustomData } from "@/ts/interface";

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});

const width = computed(() => {
  if (props.visible) return "w-2/5";
  else return "w-0";
});

const router = useRouter();
const close = () => {
  router.push("/");
};
</script>

<template>
  <div
    :class="[
      width,
      'h-screen bg-surface-low z-10 absolute right-0 transition-all duration-200 ease-in',
    ]"
  >
    <div class="w-full h-full relative overflow-hidden flex flex-col">
      <XMarkIcon
        class="w-6 h-6 hover:cursor-pointer absolute right-4 top-4"
        @click="close"
      />
      <h3>Hehe</h3>
    </div>
  </div>
</template>
