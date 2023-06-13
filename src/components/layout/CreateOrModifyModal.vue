<template>
  <div
    class="fixed top-0 left-0 w-[100vw] h-[100vh] bg-transparent z-50"
    @click="handleOuterClick"
  >
    <div
      class="px-[32px] rounded-[10px] py-[36px] w-[600px] absolute left-[50%] top-[50%] -translate-x-[50%] h-[800px] overflow-y-scroll -translate-y-[50%] h-[1000px] bg-[#11101A]"
      @click="handleInnerClick"
    >
      <div class="flex items-center justify-center">
        <button
          @click="handleOuterClick"
          class="absolute text-white top-[40px] right-[30px]"
        >
          X
        </button>
        <h1 v-if="title" class="text-white font-medium text-[24px]">
          {{ title }}
        </h1>

        <div
          class="absolute w-full h-[0.1px] bg-[#EFEFEF] opacity-[0.3] mt-[100px]"
        ></div>
      </div>
      <div
        class="flex text-white items-center justify-start pt-[60px] mb-[28px]"
      >
        <img
          class="mr-[20px] w-[60px] h-[60px] rounded-full"
          :src="displayImage"
        />
        <p>{{ displayUsername }}</p>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user/index";
import { computed } from "vue";
import NoUserImage from "@/assets/images/NoUserImage.png";

export default {
  props: {
    title: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
  },

  setup() {
    const router = useRouter();
    const userStore = useUserStore();
    const handleOuterClick = () => {
      router.back();
    };
    const handleInnerClick = (event) => {
      event.stopPropagation();
    };

    const displayImage = computed(() =>
      userStore.getUser.thumbnail ? userStore.getUser.thumbnail : NoUserImage
    );

    const displayUsername = computed(() => userStore.getUser.username);

    return {
      handleInnerClick,
      handleOuterClick,
      displayImage,
      displayUsername,
    };
  },
};
</script>
