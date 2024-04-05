<script setup lang="ts">
import { defineProps, defineEmits, ref } from "vue";

import { AppModal, AppInput, AppTextbox, AppSelect, AppButton } from "../base";

defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
});

const title = ref("");
const description = ref("");
const nodeSelections = [
  { key: "sendMessage", value: "Send Message" },
  { key: "addComment", value: "Add Comments" },
  { key: "businessHours", value: "businessHours" },
];

const selectedNode = ref("");

const emit = defineEmits(["close", "add"]);

const handleCancel = () => {
  emit("close");
};

const handleAddNode = () => {
  console.log("handleAddNode");
  emit("add", { title: title.value, description: description.value });
  handleCancel();
};
</script>

<template>
  <AppModal title="Add Node" :visible="visible">
    <div class="flex flex-col gap-6">
      <AppInput label="Title" v-model="title" />
      <AppTextbox label="Description" v-model="description" />
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
