<script setup lang="ts">
import { ref } from "vue";

import { EllipsisVerticalIcon } from "@heroicons/vue/16/solid";
import { PaperAirplaneIcon } from "@heroicons/vue/24/solid";

import { AppInput } from "@/components/base";

import type { PropType } from "vue";
import type { SendMessagePayload } from "@/ts/interface";

defineProps({
  payload: {
    type: Array as PropType<SendMessagePayload[]>,
  },
});

const displayActions = ref(false);
const toggleDisplayAction = () => {
  displayActions.value = !displayActions.value;
};

const newMessage = ref("");
</script>

<template>
  <div
    id="send-message-container"
    class="h-full flex flex-col w-full justify-between pb-8"
  >
    <div class="max-h-4/5">
      <template v-for="(data, index) in payload" :key="index">
        <div
          v-if="data.type === 'text'"
          class="flex gap-2 items-center relative"
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
            @click="toggleDisplayAction"
          />
          <div
            v-if="displayActions"
            class="absolute bg-gray-500 right-4 top-4 flex flex-col rounded-lg overflow-hidden transition-all duration-200 ease-in"
          >
            <buttton :class="$style.button">Edit</buttton>
            <button :class="$style.button">Delete</button>
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
      <PaperAirplaneIcon class="w-6 h-6 text-primary hover:cursor-pointer" />
    </div>
  </div>
</template>

<style lang="postcss" module>
.button {
  @apply min-w-[150px] py-2 text-center text-white hover:cursor-pointer hover:bg-blue-950;
}
</style>
