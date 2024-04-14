<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { DatePicker } from "v-calendar";
import { CalendarIcon } from "@heroicons/vue/24/outline";
import dayjs from "dayjs";

export default defineComponent({
  name: "AppDatepicker",
  components: {
    DatePicker,
    CalendarIcon,
  },
  props: {
    disabled: {
      type: null,
      required: false,
    },
    modelValue: {
      type: String,
      required: true,
    },
    errormessage: {
      type: String,
      required: false,
    },
    error: {
      type: Boolean,
      required: false,
    },
    label: {
      type: String,
      required: true,
    },
    dataId: {
      type: String,
      required: true,
    },
    required: {
      type: Boolean,
      required: false,
    },
    maxDate: {
      type: String,
      required: false,
    },
    minDate: {
      type: String,
      required: false,
    },
  },
  setup(props, { emit }) {
    const masks = ref({
      input: "DD MMM YYYY",
    });

    const date = computed<string>({
      get(): string {
        return props.modelValue;
      },

      set(newValue: string) {
        if (!newValue) return;

        emit("update:modelValue", dayjs(newValue).format("YYYY-MM-DD"));
      },
    });
    return { masks, date };
  },
});
</script>

<template>
  <DatePicker
    v-model="date"
    :masks="masks"
    is-expanded
    :max-date="maxDate"
    :min-date="minDate"
    mode="dateTime"
  >
    <template v-slot="{ inputValue, showPopover }">
      <label
        :data-id="`label-${dataId.toLowerCase().replace(/ /g, '-')}`"
        :class="$style.inputLabel"
        data-test="label"
      >
        {{ label }}
        <span v-if="required" data-test="label-required" class="text-danger"
          >*</span
        >
      </label>
      <div
        :class="`${$style.inputContainer}  ${
          error ? $style.inputError : null
        } ${disabled ? ' opacity-50 cursor-not-allowed' : null}`"
        @click="!disabled ? showPopover() : null"
      >
        <CalendarIcon :class="$style.icon" />
        <input
          :placeholder="$attrs.placeholder as string"
          :class="$style.inputDate"
          :data-id="`input-${dataId.toLowerCase().replace(/ /g, '-')}`"
          :id="dataId.toLowerCase().replace(/ /g, '_')"
          :disabled="disabled"
          :value="inputValue"
          ref="mydate"
          readonly
        />
      </div>
      <div v-if="error" :class="$style.error" data-test="label-error">
        {{ errormessage }}
      </div>
    </template>
  </DatePicker>
</template>

<style lang="postcss" module scoped>
input[type="date"]::-webkit-calendar-picker-indicator {
  background: transparent;
  bottom: 0;
  color: transparent;
  cursor: pointer;
  height: auto;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  width: auto;
  content: attr(placeholder) !important;
}
.icon {
  @apply h-6 w-6 mr-1 text-white;
}
.inputDate {
  @apply w-full bg-surface text-white h-full focus:outline-none placeholder:font-medium placeholder-[#A2AAB4];
}
.inputContainer {
  @apply flex  w-full items-center bg-surface rounded-lg h-10 pl-4 pr-2 text-sm border border-white focus:outline-none;
}
.error {
  @apply flex items-center font-medium tracking-wide text-danger text-xs ml-2	my-1.5;
}
.inputError {
  @apply border-danger;
}
.inputLabel {
  @apply block text-white mb-1.5 font-medium;
}
</style>
