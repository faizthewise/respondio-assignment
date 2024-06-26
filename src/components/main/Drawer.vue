<script lang="ts" setup>
import { computed, watch, ref } from "vue";
import { PencilIcon, TrashIcon, XMarkIcon } from "@heroicons/vue/20/solid";
import { useRouter, useRoute } from "vue-router";

import { AppModal, AppButton, AppInput, AppTextbox } from "../base";
import { SendMessage, AddComment, BusinessHours } from "@/components/drawer";
import { useNodeStore } from "@/stores/nodes";

import type { CustomNode } from "@/ts/type";
import { NodeTypes } from "@/constants";
import type { BusinessHoursTimes } from "@/ts/interface";

const route = useRoute();
const showDrawer = ref(false);

const nodeStore = useNodeStore();
const nodeDetail = ref<CustomNode>();

const selectedNodeId = computed(() => {
  return route.params?.node_id?.toString();
});

watch(
  selectedNodeId,
  (newNodeId, oldNodeId) => {
    if (!newNodeId) {
      //selectedNodeId has no value
      showDrawer.value = false;
      return;
    }

    nodeDetail.value = nodeStore.getNodeById(newNodeId);

    if (showDrawer.value === true && newNodeId !== oldNodeId) {
      // Change from one node to another node
      showDrawer.value = false;
      setTimeout(() => {
        showDrawer.value = true;
      }, 500);
    } else if (newNodeId !== oldNodeId) {
      showDrawer.value = !!newNodeId;
    }
  },
  { immediate: true }
);

const width = computed(() => {
  const screenWidth: number = window.innerWidth;
  if (showDrawer.value) {
    if (screenWidth > 1024) {
      return "w-2/5";
    } else if (screenWidth >= 768) {
      return "w-3/5";
    } else {
      return "w-full";
    }
  } else return "w-0";
});

const router = useRouter();
const close = () => {
  router.push("/");
};

const displayModal = ref(false);
const toggleDisplayModal = () => {
  displayModal.value = !displayModal.value;
};

const modifyMode = ref("");

const modalTitle = computed(() => {
  if (modifyMode.value === "delete") return "Remove Node";
  else return "Update Node";
});

const handleModify = (modify: string) => {
  modifyMode.value = modify;
  toggleDisplayModal();
};

const deleteNode = () => {
  nodeStore.removeNode(nodeDetail.value?.id as string);
  toggleDisplayModal();
  close();
};

const title = ref(nodeDetail.value?.data?.title || "");
const description = ref(nodeDetail.value?.data?.description || "");

const updateNode = () => {
  const updatedNode = {
    ...nodeDetail.value,
    data: { title: title.value, description: description.value },
  };

  nodeStore.updateNode(updatedNode as CustomNode);
  toggleDisplayModal();
  close();
};

const { sendMessage, addComment, businessHours } = NodeTypes;
</script>

<template>
  <AppModal :title="modalTitle" :visible="displayModal">
    <template v-if="modifyMode === 'delete'">
      <p>Are you sure about removing the node?</p>
      <div class="w-full flex justify-end gap-4">
        <AppButton id="cancel" theme="secondary" @click="toggleDisplayModal">
          Cancel
        </AppButton>
        <AppButton id="remove" theme="danger" @click="deleteNode">
          Remove
        </AppButton>
      </div>
    </template>
    <template v-else-if="modifyMode === 'update'">
      <AppInput id="title" label="title" v-model="title" />
      <AppTextbox id="description" label="description" v-model="description" />
      <div class="w-full flex justify-end gap-4 mt-8">
        <AppButton id="cancel" theme="secondary" @click="toggleDisplayModal">
          Cancel
        </AppButton>
        <AppButton id="update" @click="updateNode"> Update </AppButton>
      </div>
    </template>
  </AppModal>
  <div
    :class="[
      width,
      'h-screen bg-surface-low z-10 fixed right-0 transition-all duration-200 ease-in ',
    ]"
  >
    <div
      class="w-full h-full relative overflow-hidden flex flex-col pt-10 px-6"
    >
      <XMarkIcon
        class="w-5 h-5 absolute top-2 right-2 hover:cursor-pointer hover:text-white"
        @click="close"
      />
      <div class="flex flex-col gap-3 mb-6 h-max">
        <div class="flex justify-between items-center">
          <h3>{{ nodeDetail?.data?.title }}</h3>

          <div class="flex gap-3">
            <TrashIcon
              class="w-5 h-5 hover:cursor-pointer text-danger"
              @click="
                () => {
                  handleModify('delete');
                }
              "
            />
            <PencilIcon
              class="w-5 h-5 hover:cursor-pointer text-primary"
              @click="
                () => {
                  handleModify('update');
                }
              "
            />
          </div>
        </div>
        <p class="text-sm">{{ nodeDetail?.data?.description }}</p>
      </div>

      <div class="h-[2px] bg-white w-full"></div>
      <div v-if="showDrawer" class="mt-8 h-full">
        <SendMessage
          v-if="nodeDetail?.type === sendMessage"
          :payload="nodeDetail?.data?.payload"
          :node-id="selectedNodeId"
          :type="nodeDetail?.type"
        />
        <AddComment
          v-if="nodeDetail?.type === addComment"
          :node-id="selectedNodeId"
          :comment="nodeDetail?.data?.comment"
        />
        <BusinessHours
          v-if="nodeDetail?.type === businessHours"
          :node-id="selectedNodeId"
          :times="nodeDetail?.data?.times as BusinessHoursTimes[]"
          :timezone="nodeDetail?.data?.timezone"
        />
      </div>
    </div>
  </div>
</template>
