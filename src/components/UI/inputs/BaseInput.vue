<template>
  <div>
    <div class="mb-[16px]">
      <div v-if="title">
        <label :for="name" class="font-semibold text-[16px] text-white"
          >{{ title }}<span class="text-[#DC3545] ml-[4px]">*</span></label
        >
      </div>
      <div class="flex items-center">
        <Field :rules="rules" :name="name" :id="name" v-model="inputData">
          <template #default="{ meta }">
            <input
              class="w-[360px] h-[38px] bg-[#CED4DA] border border-[#232323] p-4 mt-[8px]"
              :class="displayValidationBorder(meta)"
              :type="type"
              :placeholder="placeholder || name"
              :value="inputData"
              @input="inputData = $event.target.value"
              @blur="meta.touched = true"
            />

            <icon-input-valid
              v-if="inputIsValid(meta)"
              class="absolute left-[450px] mt-[10px]"
            ></icon-input-valid>
            <icon-input-invalid
              v-if="inputIsInvalid(meta)"
              class="absolute left-[450px] mt-[10px]"
            ></icon-input-invalid>
          </template>
        </Field>
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
import IconInputOnFocus from "@/components/icons/IconInputOnFocus.vue";

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
    IconInputOnFocus,
  },

  setup({ name }, { emit }) {
    const inputData = ref("");

    watch(inputData, (newValue) => {
      const key = name;
      const value = newValue;
      emit("set-input-value", { key, value });
    });

    const inputIsValid = computed(
      () => (meta) =>
        (meta.valid && meta.touched && meta.value.length) ||
        (meta.errors &&
          !meta.errors.length &&
          meta.touched &&
          meta.value.length > 0)
    );
    const inputIsInvalid = computed(
      () => (meta) => (!meta.valid && meta.touched) || meta.errors.length
    );

    const displayValidationBorder = computed(
      () => (meta) =>
        (meta.valid && meta.touched && meta.value.length) ||
        (meta.errors &&
          !meta.errors.length &&
          meta.touched &&
          meta.value.length)
          ? "border-[1.5px] border-[#198754]"
          : (!meta.valid && meta.touched) || meta.errors.length
          ? "border border-[#E31221]"
          : ""
    );

    return {
      inputData,
      inputIsInvalid,
      inputIsValid,
      displayValidationBorder,
    };
  },
};
</script>
