<template>
  <div class="flex items-center">
    <div class="mr-[.25rem]">
      <Field
        :id="name"
        v-model="inputData"
        class="bg-[#CED4DA] border border-[#232323] p-4 mt-[.5rem]"
        :name="name"
        type="checkbox"
        :value="value"
      />
    </div>
    <div v-if="title">
      <label :for="name" class="font-semibold text-[1rem] text-white">{{
        title
      }}</label>
    </div>
  </div>
</template>

<script>
import { Field } from "vee-validate";
import { ref, watch } from "vue";

export default {

  components: {
    Field,
  },
  props: {
    title: {
      type: String,
      required: false,
      default: ''
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
  emits: {
    "set-input-value": (val) => typeof val === "object",
  },
  
  setup(props, { emit }) {
    const inputData = ref("");
    watch(inputData, (newValue) => {
      const key = props.name;
      const value = newValue;
      emit("set-input-value", { key, value });
    });
    return {
      inputData,
    };
  },
};
</script>
