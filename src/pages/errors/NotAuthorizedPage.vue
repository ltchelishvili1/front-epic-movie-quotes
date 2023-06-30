<template>
  <div
    class="h-screen bg-auth-dark flex flex-col items-center justify-center relative"
  >
    <div>
      <icon-union
        class="absolute -translate-y-[125%] -translate-x-[50%]"
      ></icon-union>
      <icon-not-authorized
        class="absolute -translate-y-[100%] -translate-x-[50%]"
      ></icon-not-authorized>
    </div>
    <p class="text-white text-[47px] py-4">{{ $t("shall_not_pass") }}</p>
    <p class="text-white text-[24px] py-4">
      {{ $t("do_not_have_permission") }}
    </p>
    <base-button button-class="primary" @click="handleClick">{{
      $t("return_home")
    }}</base-button>
  </div>
</template>

<script>
import IconNotAuthorized from "@/components/icons/IconNotAuthorized.vue";
import IconUnion from "@/components/icons/IconUnion.vue";
import BaseButton from "@/components/UI/inputs/BaseButton.vue";
import { useRouter } from "vue-router";

export default {
  components: {
    IconNotAuthorized,
    IconUnion,
    BaseButton,
  },
  setup() {
    const router = useRouter();

    const handleClick = () => {
      router.push({ name: "main" });
    };

    return {
      handleClick,
    };
  },
};
</script>
