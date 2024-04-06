<script lang="ts" setup>
import { defineProps } from "vue";
import { ChevronDownIcon } from "@heroicons/vue/16/solid";

defineProps({
  modelValue: {
    type: [String, Number, Boolean],
    required: false,
  },
  label: {
    type: String,
    required: true,
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
  options: {
    type: Array,
    required: true,
  },
  optionKey: {
    type: String,
    default: null,
    required: false,
  },
  optionValue: {
    type: String,
    default: null,
    required: false,
  },
  showLabel: {
    type: Boolean,
    default: true,
    required: false,
  },
  required: {
    type: [Boolean, Object],
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);

const onChange = ($event: Event) => {
  if (($event.target as HTMLTextAreaElement).value === "true")
    return emit("update:modelValue", true);
  else if (($event.target as HTMLTextAreaElement).value === "false")
    return emit("update:modelValue", false);
  else
    return emit(
      "update:modelValue",
      ($event.target as HTMLTextAreaElement).value
    );
};
</script>

<template>
  <div>
    <label
      v-if="showLabel"
      :data-id="`label-${label.toLowerCase().replace(/ /g, '-')}`"
      :class="$style.inputLabel"
    >
      {{ label }}
      <span v-if="required" data-test="label-required" class="text-danger"
        >*</span
      >
    </label>
    <div class="relative">
      <select
        :placeholder="placeholder"
        :id="label.toLowerCase().replace(/ /g, '_')"
        :data-id="`input-${label.toLowerCase().replace(/ /g, '-')}`"
        :class="`${$style.inputSelect} ${error ? $style.inputError : ''} ${
          disabled ? $style.disabled : ''
        }`"
        :value="modelValue"
        v-bind="{
          ...$attrs,
          onChange,
        }"
      >
        <option
          v-for="option in options as any[]"
          :key="option"
          :selected="option === modelValue"
          :value="optionKey ? option[optionKey] : option"
          :data-id="
            optionValue
              ? option[optionValue]
              : option.toLowerCase().replace(/ /g, '-')
          "
        >
          {{ optionValue ? option[optionValue] : option }}
        </option>
      </select>
      <ChevronDownIcon
        class="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2"
      />
    </div>

    <div v-if="error" :class="$style.error" data-test="label-error">
      {{ errormessage }}
    </div>
  </div>
</template>

<style lang="postcss" module scoped>
.inputLabel {
  @apply block text-white mb-[0.375rem] font-medium;
}
.inputSelect {
  @apply w-full border border-white bg-inherit px-4 py-3 rounded-full outline-none text-white;
}
.error {
  @apply flex items-center text-danger text-sm my-[0.375rem];
}
.inputError {
  @apply border-danger bg-danger-low  text-danger-high;
}
.disabled {
  @apply cursor-not-allowed;
}
</style>
<style scope>
select {
  -moz-appearance: none; /* Firefox */
  -webkit-appearance: none; /* Safari and Chrome */
  appearance: none;
}
</style>
