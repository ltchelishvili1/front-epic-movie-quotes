<template>
  <div>
    <div v-if="hideExtraFields" class="flex relative">
      <div class="mr-[0.625rem] md:mr-[1.9rem]">
        <slot></slot>
      </div>

      <button v-if="!googleId" type="button" class="absolute -right-[2.1875rem] translate-y-[0.625rem] text-white mt-[1.9rem]" @click="displayForm">
        {{ $t("edit") }}
      </button>
    </div>
    <div
      v-if="hideExtraFields && isMobile"
      class="w-full h-[.12rem] my-[0.625rem] bg-[#CED4DA80]"
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
