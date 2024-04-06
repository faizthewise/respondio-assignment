<script setup lang="ts">
import { ref } from "vue";

import { EllipsisVerticalIcon } from "@heroicons/vue/16/solid";
import { PaperAirplaneIcon, PlusIcon } from "@heroicons/vue/24/solid";

import { AppInput, AppImagePreview } from "@/components/base";
import { useNodeStore } from "@/stores/nodes";

import type { PropType } from "vue";
import type { SendMessagePayload } from "@/ts/interface";

const props = defineProps({
  nodeId: {
    type: String,
    default: "",
  },
  payload: {
    type: Array as PropType<SendMessagePayload[]>,
    default: [],
  },
});

const displayActions = ref<number[]>([]);
const toggleDisplayAction = (index: number) => {
  if (displayActions.value.includes(index)) {
    const i = displayActions.value.indexOf(index);
    displayActions.value.splice(i, 1);
  } else displayActions.value.push(index);
};

const nodeStore = useNodeStore();

const newMessage = ref("");

const addNewMessage = () => {
  const message = {
    type: "text",
    text: newMessage.value,
  };

  nodeStore.addPayloadToNode(message, props.nodeId);
  newMessage.value = "";
};

const handleDelete = (index: number) => {
  nodeStore.deletePayloadFromNode(index, props.nodeId);
  toggleDisplayAction(index);
};

const enabledFields = ref<number[]>([]);
const toggleEnableField = (index: number) => {
  if (enabledFields.value.includes(index)) {
    const i = enabledFields.value.indexOf(index);
    enabledFields.value.splice(i, 1);
  } else {
    enabledFields.value.push(index);
    toggleDisplayAction(index);
  }
};

const handleUpdate = (index: number) => {
  nodeStore.updatePayloadItem(props.nodeId, index, props.payload[index]);
  toggleEnableField(index);
};

const handleFileChange = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      const base64Data = reader.result as string;

      updateImage(base64Data);
    };
    reader.readAsDataURL(file);
  }
};

const updateImage = (base64Data: string) => {
  const message = {
    type: "attachment",
    attachment: base64Data,
  };

  nodeStore.addPayloadToNode(message, props.nodeId);
};
</script>

<template>
  <div
    id="send-message-container"
    class="h-full flex flex-col w-full justify-between pb-8"
  >
    <div class="max-h-4/5 flex flex-col gap-4">
      <template v-for="(data, index) in payload" :key="index">
        <div
          v-if="data.type === 'text'"
          class="flex gap-2 items-center relative"
          :key="index"
        >
          <form @submit.prevent="handleUpdate(index)" class="w-full">
            <AppInput
              :id="`message-${index}`"
              :disabled="!enabledFields.includes(index)"
              :displayLabel="false"
              v-model="data.text"
              class="w-full"
            />
          </form>

          <EllipsisVerticalIcon
            class="w-4 h-4 hover:cursor-pointer hover:text-white"
            @click="
              () => {
                toggleDisplayAction(index);
              }
            "
          />
          <div
            v-if="displayActions.includes(index)"
            class="absolute bg-gray-500 right-4 top-4 flex flex-col rounded-lg overflow-hidden transition-all duration-200 ease-in z-10"
          >
            <buttton
              :class="$style.button"
              @click="() => toggleEnableField(index)"
            >
              Edit
            </buttton>
            <button :class="$style.button" @click="() => handleDelete(index)">
              Delete
            </button>
          </div>
        </div>
        <div v-else>
          <AppImagePreview :src="data.attachment" alt="preview-img" />
        </div>
      </template>
    </div>

    <div class="w-full flex gap-2 items-center">
      <label>
        <PlusIcon class="w-6 h-6 text-primary hover:cursor-pointer" />
        <input type="file" class="hidden" @change="handleFileChange" />
      </label>
      <form @submit.prevent="addNewMessage" class="w-full">
        <AppInput
          id="new-message"
          v-model="newMessage"
          placeholder="Enter message..."
          class="w-full"
        />
      </form>

      <PaperAirplaneIcon
        class="w-6 h-6 text-primary hover:cursor-pointer"
        @click="addNewMessage"
      />
    </div>
  </div>
</template>

<style lang="postcss" module>
.button {
  @apply min-w-[150px] py-2 text-center text-white hover:cursor-pointer hover:bg-blue-950;
}
</style>
