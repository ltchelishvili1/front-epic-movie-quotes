<template>
  <div>
    <div v-if="hideExtraFields" class="flex relative">
      <div class="mr-[10px] md:mr-[30px]">
        <slot></slot>
      </div>

      <button v-if="!googleId" type="button" class="absolute -right-[35px] translate-y-[10px] text-white mt-[30px]" @click="displayForm">
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
    googleId: {
      type: String,
      default: '',
    },
  },
  emits: {
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
