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
import { Field, ErrorMessage } from "vee-validate";
import { ref, watch } from "vue";
import { useSignUpStore } from "@/stores/sign-up/index";

export default {
  props: {
    page: {
      type: String,
      required: false,
      default: "identification",
    },
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
      default: 'text'
    },
  },

  components: {
    Field,
    ErrorMessage,
  },

  setup({ name }) {
    const inputData = ref("");
    const signUpStore = useSignUpStore();

    watch(inputData, (newValue) => {
      const key = name;
      const value = newValue;
      signUpStore.setInputValue({ key, value });
    });

    return {
      inputData,
    };
  },
};
</script>