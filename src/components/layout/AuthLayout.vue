<template>
  <div
    class="fixed top-0 left-0 w-[100vw] h-[100vh] backdrop-blur-[.2rem] bg-transparent z-50"
    @click="handleOuterClick"
  >
    <div
      class="rounded-[0.6rem] py-[3.3rem] w-[37.5rem] px-[7.5rem] flex flex-col items-center justify-center fixed left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] bg-[#222030]"
      @click="handleInnerClick"
    >
      <h1 v-if="title" class="text-white font-medium text-[2rem]">
        {{ title }}
      </h1>
      <p v-if="description" class="text-[#6C757D] pb-[1.4rem]">
        {{ description }}
      </p>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
export default {
  props: {
    title: {
      type: String,
      required: false,
      default: ''
    },
    description: {
      type: String,
      required: false,
      default: ''
    },
  },

  setup() {
    const router = useRouter();

    const handleOuterClick = () => {
      router.push({name: 'main'});
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
