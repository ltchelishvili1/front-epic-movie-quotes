<template>
  <div>
    <div class="mb-[16px]">
      <div v-if="title">
        <label :for="name" class="font-semibold text-[16px] text-white"
          >{{ title }}<span class="text-[#DC3545] ml-[4px]">*</span></label
        >
      </div>
      <div class="flex items-center">
        <Field
          :rules="rules"
          :name="name"
          :id="name"
          :class="displayValidationBorder"
          v-model="inputData"
          class="w-[360px] h-[38px] bg-[#CED4DA] border border-[#232323] p-4 mt-[8px]"
          :type="type"
          :placeholder="placeholder || name"
          :value="inputData"
          @input="inputData = $event.target.value"
        />

        <icon-input-valid
          v-if="inputIsValid"
          class="absolute left-[450px] mt-[10px]"
        ></icon-input-valid>
        <icon-input-invalid
          v-else-if="inputIsInvalid"
          class="absolute left-[450px] mt-[10px]"
        ></icon-input-invalid>
      </div>
      <div class="mt-[6px]">
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
  props: {
    title: {
      type: String,
      required: false,
    },
    rules: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      required: false,
      default: "text",
    },

    errors: {
      type: Object,
      required: false,
    },
  },

  components: {
    Field,
    ErrorMessage,
    IconInputValid,
    IconInputInvalid,
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
        ? "border-[1.5px] border-[#198754]"
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
