<template>
  <div>
    <div v-if="hideExtraFields" class="flex">
      <slot></slot>
      <button
        type="button"
        class="text-white mt-[30px] ml-[10px] md:ml-[30px]"
        @click="displayForm"
      >
        {{ $t("edit") }}
      </button>
    </div>
    <div
      v-if="hideExtraFields && isMobile"
      class="w-full h-[2px] my-[10px] bg-[#CED4DA80]"
    ></div>
    <div>
      <slot name="update-input"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    hideExtraFields: {
      type: Boolean,
      required: true,
    },
    isMobile: {
      type: Boolean,
      required: false,
    },
  },
  emits:{
    "display-form": null,
  },
  setup(_, { emit }) {
    const displayForm = () => {
      emit("display-form");
    };
    return {
      displayForm,
    };
  },
};
</script>
