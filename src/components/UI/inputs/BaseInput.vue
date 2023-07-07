<template>
  <div>
    <div class="mb-[1rem]">
      <div v-if="title">
        <label :for="name" class="font-semibold text-[1rem] text-white"
          >{{ title }}<span class="text-[#DC3545] ml-[.25rem]">*</span></label
        >
      </div>
      <div class="flex items-center">
        <Field
          :id="name"
          v-model="inputData"
          :rules="rules"
          :name="name"
          :class="displayValidationBorder"
          class="w-[22.5rem] h-[2.4rem] bg-[#CED4DA] border border-[#232323] p-4 mt-[.5rem]"
          :type="type"
          :placeholder="placeholder || name"
          :value="inputData"
          @input="inputData = $event.target.value"
        />

        <icon-input-valid
          v-if="inputIsValid"
          class="absolute left-[28.125] mt-[0.625rem]"
        ></icon-input-valid>
        <icon-input-invalid
          v-else-if="inputIsInvalid"
          class="absolute left-[28.125] mt-[0.625rem]"
        ></icon-input-invalid>
      </div>
      <div class="mt-[0.375rem]">
        <ErrorMessage class="text-red-500 ml-4" :name="name" />
      </div>
    </div>
  </div>
</template>

<script>
import IconInputValid from "@/components/icons/IconInputValid.vue";
import IconInputInvalid from "@/components/icons/IconInputInvalid.vue";

import { Field, ErrorMessage, useField } from "vee-validate";
import { computed, ref, watch } from "vue";

export default {

  components: {
    Field,
    ErrorMessage,
    IconInputValid,
    IconInputInvalid,
  },
  props: {
    title: {
      type: String,
      required: false,
      default: ''
    },
    rules: {
      type: String,
      required: false,
      default: ''
    },
    name: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: false,
      default: ''
    },
    type: {
      type: String,
      required: false,
      default: "text",
    },

    errors: {
      type: Object,
      required: false,
      default: () => {}
    },
  },

  emits: {
    "set-input-value": (val) => typeof val === "object",
  },

  setup(props, { emit }) {
    const inputData = ref("");
    const { meta } = useField(props.name);

    watch(inputData, (newValue) => {
      const key = props.name;
      const value = newValue;
      emit("set-input-value", { key, value });
    });

    const inputIsValid = computed(
      () => meta.valid && meta.touched && meta.value.length
    );
    const inputIsInvalid = computed(
      () => meta.touched && (!meta.valid || !meta.value.length)
    );

    const displayValidationBorder = computed(() =>
      meta.valid && meta.touched && meta.value.length
        ? "border-[0.09375rem] border-[#198754]"
        : (!meta.valid && meta.touched) || meta.errors.length
        ? "border border-[#E31221]"
        : ""
    );

    const isTouched = (touched) => {
      meta.touched = touched;
    };

    return {
      inputData,
      inputIsValid,
      inputIsInvalid,
      displayValidationBorder,
      isTouched,
    };
  },
};
</script>
