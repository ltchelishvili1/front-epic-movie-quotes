<template>
  <section
    class="absolute bottom-[50%] left-[50%] w-[100vw] h-screen -translate-x-[51%] translate-y-[50%] backdrop-blur-[.2rem] bg-transparent z-50 flex flex-col items-center justify-center"
  >
    <div
      class="bg-[#BADBCC] p-4 flex items-center justify-center rounded scale-[.8] md:scale-[1.3] lg:scale-[1.3]"
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
