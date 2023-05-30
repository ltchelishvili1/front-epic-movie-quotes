<template>
  <div>
    <div class="mb-[16px]">
      <div v-if="title">
        <label :for="name" class="font-semibold text-[16px] text-white"
          >{{ title }}<span class="text-[#DC3545] ml-[4px]">*</span></label
        >
      </div>
      <Field
        class="w-[360px] h-[38px] bg-[#CED4DA] border border-[#232323] p-4 mt-[8px]"
        :id="name"
        :name="name"
        :type="type"
        :placeholder="placeholder || name"
        :rules="rules"
        v-model="inputData"
      />
      <div class="mt-[6px]">
        <ErrorMessage class="text-red-500 ml-4" :name="name" />
      </div>
    </div>
  </div>
</template>

<script>
import { Field, ErrorMessage, useForm } from "vee-validate";
import { computed, inject, onBeforeMount, onMounted, ref, watch } from "vue";

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
  },

  setup({ name }, { emit }) {
    const inputData = ref("");
    watch(inputData, (newValue) => {
      const key = name;
      const value = newValue;
      emit("set-input-value", { key, value });
    });

    return {
      inputData,
    };
  },
};
</script>
