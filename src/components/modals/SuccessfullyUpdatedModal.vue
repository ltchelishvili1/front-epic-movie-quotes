<template>
  <section
    class="fixed top-0 left-0 w-[100vw] h-[100vh] backdrop-blur-[3px] bg-transparent z-50 flex flex-col items-center justify-center"
  >
    <div
      class="bg-[#BADBCC] p-4 flex items-center justify-center rounded scale-[.8] md:scale-[1.3] lg:scale-[1.3] -translate-y-[200px]"
    >
      <icon-input-valid class="mx-4"></icon-input-valid>
      <p class="text-white p-2 text-[#0F5132]">
        {{ $t("changes_updated_sucessfully") }}
      </p>
      <span class="ml-20 text-white" @click="cancel">X</span>
    </div>
  </section>
</template>
<script>
import IconInputValid from "@/components/icons/IconInputValid.vue";

export default {
  components: { IconInputValid },
  emits: {
    cancel: null,
  },
  setup(_, { emit }) {
    const cancel = () => {
      emit("cancel");
    };

    return {
      cancel,
    };
  },
};
</script>
