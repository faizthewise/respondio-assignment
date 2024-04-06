<script setup lang="ts">
import { computed } from "vue";
import type { NodeProps } from "@vue-flow/core";
import { useRouter } from "vue-router";

import {
  BoltIcon,
  ChatBubbleBottomCenterTextIcon,
  BuildingStorefrontIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/vue/24/outline";

import type { NodeCustomData, CustomEvents } from "@/ts/interface";
import { NodeTypes } from "@/constants";

const props = defineProps<NodeProps<NodeCustomData>>();

const { sendMessage, businessHours, addComment, trigger } = NodeTypes;

const nodeIcon = computed(() => {
  switch (props.type) {
    case trigger:
      return BoltIcon;
    case sendMessage:
      return ChevronDoubleRightIcon;
    case addComment:
      return ChatBubbleBottomCenterTextIcon;
    case businessHours:
      return BuildingStorefrontIcon;
    default:
      return null;
  }
});

const router = useRouter();

const openDrawer = (id: string) => {
  router.push(id);
};
</script>

<template>
  <div
    class="border border-gray-300 rounded-lg bg-surface-low"
    @click="openDrawer(props.id)"
  >
    <div class="flex gap-2 px-8 py-2">
      <component :is="nodeIcon" class="w-5 h-5" />
      <p class="font-medium">{{ data.title }}</p>
    </div>
    <div class="h-[2px] w-full bg-gray-300"></div>
    <div class="px-8 py-2">
      <p class="text-sm">{{ data.description }}</p>
    </div>
  </div>
</template>
