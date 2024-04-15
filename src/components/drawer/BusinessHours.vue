<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { DatePicker } from "v-calendar";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

import { AppSelect, AppButton } from "../base";
import { useNodeStore } from "@/stores/nodes";

import type { PropType } from "vue";
import type { BusinessHoursTimes } from "@/ts/interface";

dayjs.extend(utc);
dayjs.extend(timezone);
const date = ref(new Date());

const props = defineProps({
  nodeId: {
    type: String,
    default: "",
  },
  times: {
    type: Array as PropType<BusinessHoursTimes[]>,
    required: true,
  },
  timezone: {
    type: String,
  },
});

const timeZone = ref(props.timezone);
const timeZoneOptions = [
  { key: "America/Los_Angeles", display: "UTC-7 - America/Los Angeles" },
  { key: "America/Chicago", display: "UTC-5 - America/Chicago" },
  { key: "America/New_York", display: "UTC-4 - America/New York" },
  { key: "UTC", display: "UTC" },
  { key: "Europe/London", display: "UTC+1 - Europe/London" },
  { key: "Europe/Berlin", display: "UTC+2 - Europe/Berlin" },
  { key: "Europe/Bucharest", display: "UTC+3 - Europe/Bucharest" },
  { key: "Asia/Shanghai", display: "UTC+8 - Asia/Shanghai" },
  { key: "Asia/Tokyo", display: "UTC+8 - Asia/Tokyo" },
];

interface startEndTime {
  startTime: string;
  endTime: string;
}

watch(
  timeZone,
  () => {
    if (timeZone.value !== "UTC") dayjs.tz.setDefault(timeZone.value);
  },
  { immediate: true }
);

const formattedTime = computed(() => {
  let result: BusinessHoursTimes[] = [];

  props.times.forEach((time) => {
    const [startHours, startMinutes] = time.startTime.split(":");
    const [endHours, endMinutes] = time.endTime.split(":");

    let startTime = dayjs()
      .utc()
      .set("hour", Number(startHours))
      .set("minute", Number(startMinutes))
      .format();
    let endTime = dayjs()
      .utc()
      .set("hour", Number(endHours))
      .set("minute", Number(endMinutes))
      .format();

    result.push({
      day: time.day,
      startTime,
      endTime,
    });
  });

  return result;
});

const nodeStore = useNodeStore();

const updateNode = () => {
  let result: BusinessHoursTimes[] = [];
  result = formattedTime.value.map(({ day, startTime, endTime }) => ({
    day,
    startTime: dayjs(startTime).utc().format("HH:mm"),
    endTime: dayjs(endTime).utc().format("HH:mm"),
  }));

  nodeStore.updateTime(props.nodeId, timeZone.value as string, result);
  alert("Updated successfully!");
};
</script>

<template>
  <div class="flex flex-col gap-6 px-4 overflow-auto">
    <div
      v-for="(time, index) in times"
      :key="time.day"
      class="flex gap-4 items-center"
    >
      <p class="w-8">{{ time.day }}</p>
      <DatePicker
        v-model="formattedTime[index].startTime"
        mode="time"
        hide-time-header
        is24hr
        :timezone="timeZone"
      />
      <p class="w-8">to</p>
      <DatePicker
        v-model="formattedTime[index].endTime"
        mode="time"
        hide-time-header
        is24hr
        :timezone="timeZone"
      />
    </div>
    <AppSelect
      v-model="timeZone"
      :options="timeZoneOptions"
      option-key="key"
      option-value="display"
      label="Timezone"
    />

    <AppButton id="save" @click="updateNode">Save</AppButton>
  </div>
</template>
