<template>
  <div>
    <div class="mb-[16px]">
      <div class="flex items-center">
        <Field
          :id="name"
          :as="isTextArea"
          :rules="rules"
          :name="name"
          :class="fieldClasses"
          class="w-full text-white bg-transparent p-4 mt-[8px] z-[10]"
          :type="type"
          :placeholder="title"
          :value="readOnly ? value : inputData"
          :readonly="readOnly ? true : false"
          @input="updateInputData"
        />
        <p
          v-if="value && !isQuote"
          class="absolute text-white w-[200px] p-4 mt-[8px]"
        >
          {{ prefix }}
        </p>

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
  components: {
    Field,
    ErrorMessage,
  },
  props: {
    title: {
      type: String,
      required: false,
      default: "",
    },
    rules: {
      type: String,
      required: false,
      default: "",
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
      default: () => {},
    },
    value: {
      type: String || Number,
      required: false,
      default: "",
    },
    isQuote: {
      type: Boolean,
      default: false,
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
  },

  emits: {
    "set-input-value": (val) => typeof val === "object",
  },
  setup(props, { emit }) {
    const prefix = ref(props.title + ":  ");
    const inputData = ref(props.value);
    const { meta } = useField(props.name);

    watch(inputData, (newValue) => {
      const key = props.name;
      const value = newValue;
      emit("set-input-value", { key, value });
    });

    const displayValidationBorder = computed(() =>
      meta.valid && meta.touched && meta.value && meta.value.length
        ? `border-[1.5px] border-[#198754]`
        : (!meta.valid && meta.touched) || meta.errors.length
        ? `border border-[#E31221] `
        : `border border-[#6C757D]`
    );

    const isTouched = (touched) => {
      meta.touched = touched;
    };

    const isTextArea = computed(() =>
      props.type === "textarea" ? "textarea" : "input"
    );

    const updateInputData = (event) => {
      inputData.value = event.target.value;
    };

    const fieldClasses = computed(() => {
      if (props.isQuote) {
        return "border border-[#6C757D]";
      }
      const classes = [displayValidationBorder.value];

      if (props.value) {
        classes.push("pl-[150px]");
      }

      return classes.join(" ");
    });

    return {
      inputData,
      displayValidationBorder,
      isTouched,
      isTextArea,
      updateInputData,
      prefix,
      fieldClasses,
    };
  },
};
</script>

<style scoped>
::placeholder {
  color: white;
}
</style>
