<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    default: "",
  },
  visible: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div
    v-show="visible"
    :class="$style.modal__overlay"
    data-test="modal-container"
  >
    <div :class="$style.modal">
      <div class="flex flex-col gap-3">
        <slot name="header"></slot>
        <div class="flex flex-col gap-3 items-start self-stretch">
          <h3 data-test="title">{{ title }}</h3>
        </div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" module>
.modal__overlay {
  @apply fixed top-0 left-0 w-[100%] h-[100%] flex items-center justify-center z-50 bg-black/70 overflow-auto;
}
.modal {
  @apply bg-surface-low p-5 md:p-8 lg:p-10 md:w-[600px] w-[100%] absolute md:relative bottom-0  flex flex-col justify-between md:rounded-xl rounded-t-xl overflow-auto;
}
</style>
