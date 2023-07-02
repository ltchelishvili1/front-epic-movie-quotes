<template>
  <section
    class="fixed top-0 left-0 w-[100vw] h-[100vh] backdrop-blur-[3px] bg-transparent z-50 flex flex-col items-center justify-center"
  >
    <div class="bg-[#22203099] p-12">
      <p class="text-white p-12">{{ $t("are_you_sure_to_make_changes") }}</p>
      <div class="w-full h-[0.1px] bg-[#EFEFEF] opacity-[0.3] mt-[24px]"></div>
      <div class="flex items-center justify-between">
        <button class="text-white" @click="cancel">{{ $t("cancel") }}</button>
        <base-button button-class="primary" @click="updateProfile">
          <span v-if="!isLoading"> {{ $t("confirm") }} </span>
          <load-spinner v-else classes="h-[25px] w-[25px]"></load-spinner>
        </base-button>
      </div>
    </div>
  </section>
</template>
<script>
import BaseButton from "@/components/UI/inputs/BaseButton.vue";
import LoadSpinner from "@/components/LoadSpinner.vue";
export default {
  components: { BaseButton,LoadSpinner },
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  emits: {
    cancel: null,
    "update-profile": null,
  },
  setup(_, { emit }) {
    const cancel = () => {
      emit("cancel");
    };
    const updateProfile = () => {
      emit("update-profile");
    };

    return {
      cancel,
      updateProfile,
    };
  },
};
</script>
