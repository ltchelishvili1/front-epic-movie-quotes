<template>
  <div class="flex items-center">
    <div class="mr-[4px]">
      <Field
        class="bg-[#CED4DA] border border-[#232323] p-4 mt-[8px]"
        :id="name"
        :name="name"
        type="checkbox"
        v-model="inputData"
        :value="value"
      />
    </div>
    <div v-if="title">
        <label :for="name" class="font-semibold text-[16px] text-white"
          >{{ title }}</label
        >
      </div>
  </div>
</template>

<script>
import { Field } from "vee-validate";
import { ref, watch } from "vue";

export default {
  props: {
    title: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  },

  components: {
    Field,
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
