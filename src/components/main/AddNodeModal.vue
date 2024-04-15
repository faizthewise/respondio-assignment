<script setup lang="ts">
import { ref } from "vue";

import { AppModal, AppInput, AppTextbox, AppSelect, AppButton } from "../base";
import { useNodeStore } from "@/stores/nodes";

import { NodeTypes } from "@/constants";
import type { CustomNode } from "@/ts/type";
import type { NodeCustomData } from "@/ts/interface";

defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
});

const { sendMessage, businessHours, addComment } = NodeTypes;
const nodeSelections = [
  { key: sendMessage, value: "Send Message" },
  { key: addComment, value: "Add Comments" },
  { key: businessHours, value: "Business Hours" },
];

const title = ref("");
const description = ref("");
const selectedNode = ref("");

const nodeStore = useNodeStore();

const defaultTimes = [
  {
    startTime: "09:00",
    endTime: "17:00",
    day: "mon",
  },
  {
    startTime: "09:00",
    endTime: "17:00",
    day: "tue",
  },
  {
    startTime: "09:00",
    endTime: "17:00",
    day: "wed",
  },
  {
    startTime: "09:00",
    endTime: "17:00",
    day: "thu",
  },
  {
    startTime: "09:00",
    endTime: "17:00",
    day: "fri",
  },
  {
    startTime: "09:00",
    endTime: "17:00",
    day: "sat",
  },
  {
    startTime: "09:00",
    endTime: "17:00",
    day: "sun",
  },
];

const handleAddNode = () => {
  let data: NodeCustomData = {
    title: title.value,
    description: description.value,
  };

  if (selectedNode.value === businessHours) {
    data.times = defaultTimes;
    data.timezone = "UTC";
  }
  let node = {
    id: Math.random().toString(),
    type: selectedNode.value,
    position: { x: Math.random() * 500, y: Math.random() * 500 },
    data,
  };

  nodeStore.addNode(node as CustomNode);
  handleCancel();
};

const emit = defineEmits(["close"]);

const handleCancel = () => {
  emit("close");
};
</script>

<template>
  <AppModal title="Add Node" :visible="visible">
    <div class="flex flex-col gap-6">
      <AppInput id="title" label="Title" v-model="title" />
      <AppTextbox id="description" label="Description" v-model="description" />
      <AppSelect
        label="Type of Node"
        :options="nodeSelections"
        option-key="key"
        option-value="value"
        v-model="selectedNode"
      />
      <div class="flex gap-2 justify-end">
        <AppButton id="cancel" theme="secondary" @click="handleCancel">
          Cancel
        </AppButton>
        <AppButton id="add" @click="handleAddNode">Add</AppButton>
      </div>
    </div>
  </AppModal>
</template>
