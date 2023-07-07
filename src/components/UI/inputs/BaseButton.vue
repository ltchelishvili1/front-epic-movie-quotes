<template>
  <div class="mt-[1rem]" @click="handleClick">
    <button
      :disabled="disabled"
      :class="getButtonClass"
      :type="type"
      class="flex items-center justify-center"
    >
      <span v-if="displayIcon" class="mr-[.5rem]"
        ><icon-google></icon-google>
      </span>
      <div>
        <slot></slot>
      </div>
    </button>
  </div>
</template>

<script>
import { computed } from "vue";
import IconGoogle from "@/components/icons/IconGoogle.vue";

export default {
  components: {
    IconGoogle,
  },
  props: {
    buttonClass: {
      type: String,
      default: "",
    },
    displayIcon: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: "submit",
    },
  },

  emits: {
    "click-button": null,
  },
  setup(props, { emit }) {
    const handleClick = async () => {
      emit("click-button");
    };

    const getButtonClass = computed(() =>
      props.buttonClass === "primary"
        ? "w-full bg-[#E31221] text-white px-[0.4375rem] py-[0.4375rem] rounded-[.25rem] my-[.12rem]"
        : props.buttonClass === "google"
        ? "w-full bg-transparent text-white px-[0.4375rem] py-[0.4375rem] rounded-[.25rem] border border-white flex items-center justify-center"
        : ""
    );

    return {
      handleClick,
      getButtonClass,
    };
  },
};
</script>
