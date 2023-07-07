<template>
  <div class="mt-[2rem] flex flex-col">
    <div
      :class="customizeOrder"
      class="border-[0.09375rem] border-[#CED4DA33] p-[1rem] max-w-[28.75rem]"
    >
      <div v-for="(message, index) in messages" :key="message">
        <div
          v-if="displayShouldContain(index)"
          class="text-white mb-[1rem] mt-[0.625rem]"
        >
          {{ title }} {{ $t("should_contain") }}:
        </div>
        <div class="text-white flex items-center justify-start">
          <div
            :class="displayErrorBoxBackground(message)"
            class="w-[.25rem] h-[.25rem] mr-[1rem]"
          ></div>
          <p class="text-[#9C9A9A]">
            <span :class="displayErrorTextColor(message)">
              {{ displayErrorMessage(message) }}
            </span>
          </p>
        </div>
      </div>
    </div>
    <div v-if="title" class="mt-[2rem]">
      <p class="font-semibold text-[1rem] text-white">{{
        title
      }}</p>
    </div>

    <div class="flex items-center pb-[1.9rem]">
      <Field
        :id="name"
        v-model="inputData"
        :rules="rules"
        :name="name"
        class="lg:w-[28.75rem] md:w-[22.5rem] w-full h-[2.4rem] bg-[#CED4DA] border border-[#232323] p-4 mt-[.5rem]"
        :class="displayFieldBg"
        :type="type"
        :placeholder="placeholder || name"
        :value="inputData"
        @input="inputData = $event.target.value"
      />
    </div>
  </div>
</template>

<script>
import i18n from "@/config/i18n/index.js";

import { Field, useField } from "vee-validate";
import { computed, ref, watch } from "vue";

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
    hide: {
      type: Boolean,
      required: true,
    },
    isMobile: {
      type: Boolean,
      required: true,
    },
  },

  emits: {
    "set-input-value": (val) => typeof val === "object",
  },

  setup(props, { emit }) {
    const inputData = ref("");
    const locale = localStorage.getItem("language") || "en";
    const messages = ref(
      props.rules
        .split("|")
        .map((rule) => rule.split(":"))
        .map((rule) =>
          i18n.global.messages.value[locale][rule[0]].replace(
            "0:{length}",
            rule[1]
          )
        )
    );

    const { meta } = useField(props.name);

    watch(inputData, (newValue) => {
      const key = props.name;
      const value = newValue;
      emit("set-input-value", { key, value });
    });

    const isTouched = (touched) => {
      meta.touched = touched;
    };

    const displayShouldContain = computed(
      () => (index) =>
        (props.rules.includes("min") || props.rules.includes("max")) &&
        index == 1
    );

    const displayErrorBoxBackground = computed(
      () => (message) =>
        meta.errors.includes(message)
          ? "bg-[#DC3545]"
          : meta.touched && meta.valid
          ? "bg-[#198754]"
          : "bg-white"
    );

    const displayErrorTextColor = computed(
      () => (message) =>
        !meta.errors.includes(message) && meta.touched && meta.valid
          ? "text-white"
          : ""
    );

    const displayErrorMessage = computed(
      () => (message) =>
        message === "The name field must be at least 3 characters"
          ? "3 or more characters"
          : message === "The name field may not be greater than 15 characters"
          ? "15 lowercase character"
          : message === "The name field must be at least 8 characters"
          ? "8 or more characters"
          : message
    );

    const customizeOrder = computed(() => (!props.hide ? "order-last" : ""));

    const displayFieldBg = computed(() =>
      !props.isMobile
        ? " bg-[#CED4DA] border border-[#232323] "
        : "bg-transparent text-white"
    );

    return {
      inputData,
      isTouched,
      meta,
      messages: messages.value,
      displayShouldContain,
      displayErrorBoxBackground,
      displayErrorTextColor,
      displayErrorMessage,
      customizeOrder,
      displayFieldBg,
    };
  },
};
</script>
