<script setup lang="ts">
import { ref } from "vue";

import { EllipsisVerticalIcon } from "@heroicons/vue/16/solid";
import { PaperAirplaneIcon } from "@heroicons/vue/24/solid";

import { AppInput } from "@/components/base";
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
  },
});

const displayActions = ref<string[]>([]);
const toggleDisplayAction = (index: string) => {
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
  toggleDisplayAction(index.toString());
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
          <AppInput
            :id="`message-${index}`"
            disabled
            :displayLabel="false"
            v-model="data.text"
            class="w-full"
          />

          <EllipsisVerticalIcon
            class="w-4 h-4 hover:cursor-pointer hover:text-white"
            @click="
              () => {
                toggleDisplayAction(index.toString());
              }
            "
          />
          <div
            v-if="displayActions.includes(index.toString())"
            class="absolute bg-gray-500 right-4 top-4 flex flex-col rounded-lg overflow-hidden transition-all duration-200 ease-in z-10"
          >
            <buttton :class="$style.button">Edit</buttton>
            <button :class="$style.button" @click="() => handleDelete(index)">
              Delete
            </button>
          </div>
        </div>
      </template>
    </div>

    <div class="w-full flex gap-2 items-center">
      <AppInput
        id="new-message"
        v-model="newMessage"
        placeholder="Enter message..."
        class="w-full"
      />
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
