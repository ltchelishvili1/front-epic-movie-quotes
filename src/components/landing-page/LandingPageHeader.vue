<template>
  <header
    class="md:mt-[21.5rem] mt-[8.1rem] lg:mt-[19rem] flex flex-col items-center justify-center"
  >
    <p
      class="flex flex-col items-center justify-center text-[#DDCCAA] font-bold text-[1.5rem] md:text-6xl lg:text-6xl"
    >
      {{ $t("find_any_quote") }} <br />
      <span class="mt-[.65rem]">{{ $t("from_million_movies") }}</span>
    </p>
    <base-button
      v-if="!userStore.authenticated"
      button-class="primary"
      class="md:w-[8.7rem] lg:w-[8.7rem] w-[7rem] h-[2.4rem] mr-[.9rem] mt-[1.9rem]"
      @click-button="openSignUpModal"
      >{{ $t("get_started") }}</base-button
    >
  </header>
</template>

<script>
import BaseButton from "@/components/UI/inputs/BaseButton.vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user/index";

export default {
  components: {
    BaseButton,
  },
  setup() {
    const userStore = useUserStore();
    const router = useRouter();

    const openSignUpModal = () => {
      router.push({ name: "sign-up" });
    };

    return {
      openSignUpModal,
      userStore,
    };
  },
};
</script>
