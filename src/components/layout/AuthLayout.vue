<template>
  <div
    class="fixed top-0 left-0 w-[100vw] h-[100vh] backdrop-blur-[3px] bg-transparent z-50"
    @click="handleOuterClick"
  >
    <div
      class="rounded-[10px] py-[53px] w-[600px] px-[120px] flex flex-col items-center justify-center fixed left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] bg-[#222030]"
      @click="handleInnerClick"
    >
      <h1 class="text-white font-medium text-[32px]">
        {{ $t("create_profile") }}
      </h1>
      <p class="text-[#6C757D] pb-[23px]">{{ $t("start_journey") }}</p>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();

    const handleOuterClick = () => {
      router.push({ name: "main" });
    };
    const handleInnerClick = (event) => {
      event.stopPropagation();
    };

    return {
      handleInnerClick,
      handleOuterClick,
    };
  },
};
</script>