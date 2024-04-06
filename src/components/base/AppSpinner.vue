<template>
  <svg
    :class="$style.spinner"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      :class="$style.spinner_foreground"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      stroke-width="4"
    ></circle>
    <path
      :class="$style.spinner_background"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
</template>

<script lang="ts">
export default {
  name: "AppSpinner",
};
</script>

<style lang="postcss" module>
.spinner {
  @apply animate-spin;
}
.spinner_background {
  @apply opacity-75;
}
.spinner_foreground {
  @apply opacity-25;
}
</style>
