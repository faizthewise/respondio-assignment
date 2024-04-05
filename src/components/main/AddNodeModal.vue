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

const emit = defineEmits(["close"]);

const handleCancel = () => {
  emit("close");
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
        <AppButton id="add">Add</AppButton>
      </div>
    </div>
  </AppModal>
</template>
