<template>
  <div class="mt-[32px] flex flex-col">
    <div
      :class="customizeOrder"
      class="border-[1.5px] border-[#CED4DA33] p-[16px] max-w-[460px]"
    >
      <div v-for="(message, index) in messages" :key="message">
        <div
          class="text-white mb-[16px] mt-[10px]"
          v-if="displayShouldContain(index)"
        >
          {{ title }} {{ $t("should_contain") }}:
        </div>
        <div class="text-white flex items-center justify-start">
          <div
            :class="displayErrorBoxBackground(message)"
            class="w-[4px] h-[4px] mr-[16px]"
          ></div>
          <p class="text-[#9C9A9A]">
            <span :class="displayErrorTextColor(message)">
              {{ displayErrorMessage(message) }}
            </span>
          </p>
        </div>
      </div>
    </div>
    <div v-if="title" class="mt-[32px]">
      <label :for="name" class="font-semibold text-[16px] text-white">{{
        title
      }}</label>
    </div>

    <div class="flex items-center pb-[30px]">
      <Field
        :rules="rules"
        :name="name"
        :id="name"
        v-model="inputData"
        class="lg:w-[460px] md:w-[360px] w-full h-[38px] bg-[#CED4DA] border border-[#232323] p-4 mt-[8px]"
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
import IconInputValid from "@/components/icons/IconInputValid.vue";
import IconInputInvalid from "@/components/icons/IconInputInvalid.vue";
import IconInputOnFocus from "@/components/icons/IconInputOnFocus.vue";
import i18n from "@/config/i18n/index.js";

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
    hide: {
      type: Boolean,
      required: true,
    },
    isMobile: {
      type: Boolean,
      required: true,
    },
  },

  components: {
    Field,
    ErrorMessage,
    IconInputValid,
    IconInputInvalid,
    IconInputOnFocus,
  },

  setup({ name, rules, hide, isMobile }, { emit }) {
    console.log();
    const inputData = ref("");
    const locale = localStorage.getItem("language") || "en";
    const messages = ref(
      rules
        .split("|")
        .map((rule) => rule.split(":"))
        .map((rule) =>
          i18n.global.messages.value[locale][rule[0]].replace(
            "0:{length}",
            rule[1]
          )
        )
    );

    const { meta } = useField(name);

    watch(inputData, (newValue) => {
      const key = name;
      const value = newValue;
      emit("set-input-value", { key, value });
    });

    const isTouched = (touched) => {
      meta.touched = touched;
    };

    const displayShouldContain = computed(
      () => (index) =>
        (rules.includes("min") || rules.includes("max")) && index == 1
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

    const customizeOrder = computed(() => (!hide ? "order-last" : ""));

    const displayFieldBg = computed(() =>
      !isMobile
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
