<script lang="ts" setup>
import { defineProps } from "vue";
import AppSpinner from "@/components/base/AppSpinner.vue";

defineProps({
  theme: {
    type: String,
    default: "primary",
    validator: (value: string) =>
      !value || ["primary", "secondary"].includes(value),
  },
  loading: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: "md",
    validator: (value: string) => ["sm", "md", "lg"].includes(value),
  },
  iconOnly: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <button
    type="button"
    :id="`${$attrs.id}-button`"
    :data-id="`${$attrs.id}-button`"
    :class="[
      $style.main,
      {
        [$style[theme]]: !!theme,
        [$style[size]]: !!size,
      },
    ]"
    v-bind="$attrs"
  >
    <AppSpinner v-if="loading" :class="$style.loader" />
    <slot></slot>
  </button>
</template>

<style lang="postcss" module>
.main {
  @apply flex gap-3 justify-center items-center w-max font-bold font-display focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed rounded-full transition-all duration-200 ease-in;
}
.sm {
  @apply px-3 py-2 text-xs;
}
.md {
  @apply px-8 py-[0.625rem] text-sm;
}
.lg {
  @apply px-6 py-[0.875rem] text-base;
}
.primary {
  @apply border border-transparent shadow-sm text-white bg-primary hover:bg-primary-high active:bg-primary-high;
}
.secondary {
  @apply border border-white shadow-sm text-white bg-surface hover:bg-primary hover:border-primary active:bg-primary;
}
.loader {
  @apply -ml-1 mr-3 h-5 w-5;
}
</style>
