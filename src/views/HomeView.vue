<script setup lang="ts">
import { ref } from "vue";
import { AppButton, AppSelect, AppInput, AppTextbox } from "@/components/base";

const selectedOption = ref("");
const options = ["test", "test2"];
const input = ref("");
</script>

<template>
  <div class="h-full max-w-[1440px] px-60 py-40">
    <AppButton id="create-node">Test</AppButton>
    <AppButton id="delete-node" theme="secondary">Sign Up Demo</AppButton>
    <AppSelect label="test" v-model="selectedOption" :options="options" />
    <AppInput label="input" v-model="input" />
    <AppTextbox label="comment" v-model="input" />
  </div>
</template>
