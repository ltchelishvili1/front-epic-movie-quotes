<template>
  <header
    class="md:mt-[344px] mt-[130px] lg:mt-[344px] flex flex-col items-center justify-center"
  >
    <p
      class="flex flex-col items-center justify-center text-[#DDCCAA] font-bold text-[24px] md:text-6xl lg:text-6xl"
    >
      {{ $t("find_any_quote") }} <br />
      <span class="mt-[10px]">{{ $t("from_million_movies") }}</span>
    </p>
    <base-button
      v-if="!userStore.authenticated"
      button-class="primary"
      class="md:w-[133px] lg:w-[133px] w-[109px] h-[38px] mr-[15px] mt-[30px]"
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
