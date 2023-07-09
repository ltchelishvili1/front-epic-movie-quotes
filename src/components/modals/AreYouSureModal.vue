<template>
  <section
    class="absolute bottom-[50%] left-[50%] w-[100vw] h-screen -translate-x-[50%] md:translate-y-[70%]  lg:translate-y-[70%] translate-y-[50%] backdrop-blur-[.2rem] bg-transparent z-50 flex flex-col items-center justify-center"
  >
    <div class="bg-[#22203099] p-12">
      <p class="text-white p-12">{{ $t("are_you_sure_to_make_changes") }}</p>
      <div class="w-full h-[0.07rem] bg-[#EFEFEF] opacity-[0.3] mt-[1.5rem]"></div>
      <div class="flex items-center justify-between">
        <button class="text-white" @click="cancel">{{ $t("cancel") }}</button>
        <base-button button-class="primary" @click="updateProfile">
          <span v-if="!isLoading"> {{ $t("confirm") }} </span>
          <load-spinner v-else classes="h-[1.6rem] w-[1.6rem]"></load-spinner>
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
