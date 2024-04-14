<script setup lang="ts">
import { ref } from "vue";

import AppDatepicker from "../base/AppDatepicker.vue";

import type { PropType } from "vue";
import type { BusinessHoursTimes } from "@/ts/interface";

const date = ref("");

const props = defineProps({
  nodeId: {
    type: String,
    default: "",
  },
  times: {
    type: Array as PropType<BusinessHoursTimes[]>,
  },
});
</script>

<template>
  <div class="flex flex-col gap-8 px-">
    <div v-for="time in times" :key="time.day" class="flex gap-4">
      <AppDatepicker
        v-model="time.startTime"
        :label="time.day"
        data-id="start-time"
      />
      <AppDatepicker v-model="time.endTime" label="to" data-id="end-time" />
    </div>
  </div>
</template>
