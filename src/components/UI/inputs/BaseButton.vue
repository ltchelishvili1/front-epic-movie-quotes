<template>
  <div @click="handleClick" class="mt-[16px]">
    <button :class="getButtonClass" class="flex items-center justify-center">
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
import { defineComponent, computed } from "vue";
import IconGoogle from "@/components/icons/IconGoogle.vue";

export default defineComponent({
  name: "Button",
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
      displayIcon: props.displayIcon,
    };
  },
});
</script>
