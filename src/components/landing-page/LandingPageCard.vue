<template>
  <div>
    <div
      :class="displayBackground"
      class="h-[100vh] fit pt-[80%] pl-[10%] lg:pt-[200px] lg:pl-44"
    >
      <icon-line class="mt-[10px] mr-[10px]"></icon-line>
      <div>
        <p
          class="md:text-3xl lg:text-6xl text-[20px] text-white bg-transparent font-bold lg:w-[60%] md:w-[70%] w-[75%]"
        >
          {{ quote }}
        </p>

        <p class="text-[16px] text-[#D9D9D9]">{{ movie }}</p>
      </div>
    </div>
    <div class="relative z-[-50]">
      <div
        class="absolute top-0 left-0 w-full h-full opacity-[.5] bg-landing-page-shadow"
      ></div>
    </div>
  </div>
</template>

<script>
import IconLine from "@/components/icons/IconLine.vue";
import { computed } from 'vue';
export default {
  components: {
    IconLine,
  },
  props: {
    normal: {
      type: Boolean,
      required: false,
    },
    quote: {
      type: String,
      required: true,
    },
    movie: {
      type: String,
      required: true,
    },
    background: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    const displayBackground = computed(() => {
     return !props.normal ? 'paralax ' + props.background : props.background
    })

    return{
      displayBackground
    }
  },
};
</script>

<style scoped>
.fit {
  background-size: 100% 100%;
}
.paralax {
  background-attachment: fixed;
  background-position: bottom;
}
</style>
