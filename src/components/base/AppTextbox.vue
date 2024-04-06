<script lang="ts" setup>
defineProps({
  modelValue: {
    type: [String, Number],
    required: false,
  },
  label: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    required: false,
  },
  errormessage: {
    type: String,
    required: false,
  },
  error: {
    type: Boolean,
    required: false,
  },
  required: {
    type: Boolean,
    default: false,
    required: false,
  },
  disabled: {
    type: Boolean,
    default: false,
    required: false,
  },
});

const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <div>
    <div class="flex gap-1">
      <label v-if="label" :id="`${$attrs.id}-label`" :class="$style.inputLabel">
        {{ label }}
        <span v-if="required" data-test="label-required" class="text-danger"
          >*</span
        >
      </label>
    </div>

    <div
      class="flex gap-1 items-center"
      :class="`${$style.inputContainer} ${error ? $style.inputError : null} ${
        disabled ? ' opacity-50 cursor-not-allowed' : null
      }`"
    >
      <slot name="left"></slot>

      <textarea
        v-bind="$attrs"
        class="h-full w-full"
        :class="`${$style.inputText} ${error ? $style.inputError : null} ${
          disabled ? ' opacity-50 cursor-not-allowed' : null
        }`"
        :name="label"
        :id="`${$attrs.id}-input`"
        :placeholder="placeholder"
        @input="
          $emit(
            'update:modelValue',
            ($event.target as HTMLTextAreaElement).value
          )
        "
        :value="modelValue"
        :disabled="disabled"
      />
      <slot name="right"></slot>
    </div>

    <div v-if="error">
      <div :class="$style.error" data-test="label-error">
        {{ errormessage }}
      </div>
    </div>
  </div>
</template>

<style lang="postcss" module scoped>
.inputLabel {
  @apply block text-white mb-[0.375rem] font-medium;
}
.inputContainer {
  @apply border border-white py-[0.625rem] px-4 w-full rounded-full;
}
.inputText {
  @apply w-full h-full outline-none text-white bg-inherit;
}
.error {
  @apply flex items-center text-danger text-sm my-[0.375rem];
}
.inputError {
  @apply border-danger bg-danger-low text-danger-high;
}
</style>
