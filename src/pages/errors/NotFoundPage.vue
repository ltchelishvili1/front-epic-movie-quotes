<template>
    <div
      class="h-screen bg-auth-dark flex flex-col items-center justify-center relative"
    >
      <div>
        <icon-eclipse
          class="absolute -translate-y-[100%] -translate-x-[50%]"
        ></icon-eclipse>
        <icon-not-found
          class="absolute -translate-y-[130%] -translate-x-[50%]"
        ></icon-not-found>
      </div>
      <p class="text-white text-[3rem] py-4">{{ $t("whoops") }}</p>
      <p class="text-white text-[1.5rem] py-4">
        {{ $t("not_found") }}
      </p>
      <base-button button-class="primary" @click="handleClick">{{
        $t("return_home")
      }}</base-button>
    </div>
  </template>
  
  <script>
  import IconNotFound from "@/components/icons/IconNotFound.vue";
  import IconEclipse from "@/components/icons/IconEclipse.vue";
  import BaseButton from "@/components/UI/inputs/BaseButton.vue";
  import { useRouter } from "vue-router";
  
  export default {
    components: {
      IconNotFound,
      IconEclipse,
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
  