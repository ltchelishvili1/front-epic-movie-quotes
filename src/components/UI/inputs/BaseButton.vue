<template>
  <div class="mt-[16px]" @click="handleClick">
    <button
      :disabled="disabled"
      :class="getButtonClass"
      :type="type"
      class="flex items-center justify-center"
    >
      <span v-if="displayIcon" class="mr-[8px]"
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
        ? "w-full bg-[#E31221] text-white px-[7px] py-[7px] rounded-[4px] my-[2px]"
        : props.buttonClass === "google"
        ? "w-full bg-transparent text-white px-[7px] py-[7px] rounded-[4px] border border-white flex items-center justify-center"
        : ""
    );

    return {
      handleClick,
      getButtonClass,
    };
  },
};
</script>
