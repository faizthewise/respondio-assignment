<script setup lang="ts">
import { ref } from "vue";

import { EllipsisVerticalIcon } from "@heroicons/vue/16/solid";
import { PaperAirplaneIcon } from "@heroicons/vue/24/solid";

import { AppInput } from "@/components/base";
import { useNodeStore } from "@/stores/nodes";

const props = defineProps({
  nodeId: {
    type: String,
    default: "",
  },
  comment: {
    type: String,
    default: "",
  },
});

const displayActions = ref(false);
const toggleDisplayAction = () => {
  displayActions.value = !displayActions.value;
};

const nodeStore = useNodeStore();

const existingComment = ref(props.comment || "");

const fieldEnabled = ref(false);

const toggleEnableField = () => {
  fieldEnabled.value = !fieldEnabled.value;
  toggleDisplayAction();
};

const handleUpdate = (deleteOperation: boolean) => {
  if (deleteOperation) existingComment.value = "";

  nodeStore.updateComment(props.nodeId, existingComment.value);
  fieldEnabled.value = false;
  displayActions.value = false;
};

const newComment = ref("");

const addNewComment = () => {
  existingComment.value = newComment.value;
  newComment.value = "";
  handleUpdate(false);
};
</script>

<template>
  <div
    id="send-message-container"
    class="h-full flex flex-col w-full justify-between relative"
  >
    <div class="h-full flex flex-col gap-4 overflow-auto">
      <div class="flex gap-2 items-center relative">
        <template v-if="existingComment">
          <form @submit.prevent="() => handleUpdate(false)" class="w-full">
            <AppInput
              :id="`comment`"
              :disabled="!fieldEnabled"
              :displayLabel="false"
              v-model="existingComment"
              class="w-full"
            />
          </form>
          <EllipsisVerticalIcon
            class="w-4 h-4 hover:cursor-pointer hover:text-white"
            @click="
              () => {
                toggleDisplayAction();
              }
            "
          />
        </template>
        <p v-else>Add a new comment</p>

        <div
          v-if="displayActions"
          class="absolute bg-gray-500 right-4 top-4 flex flex-col rounded-lg overflow-hidden transition-all duration-200 ease-in z-10"
        >
          <buttton :class="$style.button" @click="toggleEnableField">
            Edit
          </buttton>
          <button :class="$style.button" @click="() => handleUpdate(true)">
            Delete
          </button>
        </div>
      </div>
    </div>
    <div
      v-if="!existingComment"
      class="w-full flex gap-2 items-center h-max absolute bottom-6 right-0 bg-surface-low py-1"
    >
      <form @submit.prevent="addNewComment" class="w-full">
        <AppInput
          id="new-comment"
          v-model="newComment"
          placeholder="Enter message..."
          class="w-full"
        />
      </form>

      <PaperAirplaneIcon
        class="w-6 h-6 text-primary hover:cursor-pointer"
        @click="addNewComment"
      />
    </div>
  </div>
</template>
<style lang="postcss" module>
.button {
  @apply min-w-[150px] py-2 text-center text-white hover:cursor-pointer hover:bg-blue-950;
}
</style>
