<script setup lang="ts">
import { ref } from "vue";

import AppDatepicker from "../base/AppDatepicker.vue";

const date = ref("");
</script>

<template>
  <AppDatepicker v-model="date" label="day" data-id="label" />
</template>
