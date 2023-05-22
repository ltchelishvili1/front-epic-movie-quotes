<template>
  <button :class="getButtonClass" @click="handleClick">
    <span v-if="isGoogle" class="mr-[8px]"><icon-google></icon-google> </span>
    <slot></slot>
  </button>
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
  },
  setup(props, { emit }) {
    const handleClick = async () => {
      emit("click-button");
     
    };

    const getButtonClass = computed(() =>
      props.buttonClass === "primary"
        ? "w-full bg-[#E31221] text-white px-[7px] py-[7px] rounded-[4px] my-[16px]"
        : props.buttonClass === "google"
        ? "w-full bg-transparent text-white px-[7px] py-[7px] rounded-[4px] border border-white flex items-center justify-center"
        : ""
    );

    const isGoogle = computed(() => props.buttonClass === "google");

    return {
      handleClick,
      getButtonClass,
      isGoogle,
    };
  },
});
</script>

<style scoped></style>
