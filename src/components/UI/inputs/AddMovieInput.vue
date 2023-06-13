<template>
  <div>
    <div class="mb-[16px]">
      <div class="flex items-center">
        <Field
          :as="isTextArea"
          :rules="rules"
          :name="name"
          :id="name"
          :class="displayValidationBorder"
          v-model="inputData"
          class="w-full text-white bg-transparent p-4 mt-[8px]"
          :type="type"
          :placeholder="title"
          :value="inputData"
          @input="inputData = $event.target.value"
        />
        <span class="absolute text-[#6C757D] right-0 mr-[50px] mt-[4px]">{{
          lang
        }}</span>
      </div>
      <div class="mt-[6px]">
        <ErrorMessage class="text-red-500 ml-4" :name="name" />
      </div>
    </div>
  </div>
</template>

<script>
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
    type: {
      type: String,
      required: false,
      default: "text",
    },
    lang: {
      type: String,
      default: "",
    },

    errors: {
      type: Object,
      required: false,
    },
  },

  components: {
    Field,
    ErrorMessage,
  },

  setup({ name,type }, { emit }) {
    const inputData = ref("");
    const { meta } = useField(name);

    watch(inputData, (newValue) => {
      const key = name;
      const value = newValue;
      emit("set-input-value", { key, value });
    });


    const displayValidationBorder = computed(() =>
      meta.valid && meta.touched && meta.value.length
        ? "border-[1.5px] border-[#198754]"
        : (!meta.valid && meta.touched) || meta.errors.length
        ? "border border-[#E31221]"
        : " border border-[#6C757D]"
    );

    const isTouched = (touched) => {
      meta.touched = touched;
    };

    const isTextArea = computed(() => type === 'textarea' ? 'textarea' : 'input')

    return {
      inputData,
      displayValidationBorder,
      isTouched,
      isTextArea
    };
  },
};
</script>

<style scoped>
::placeholder {
  color: white;
}
</style>
