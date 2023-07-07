<template>
  <div>
    <div
      :style="displayBackground"
      :class="displayParalax"
      class="h-[100vh] fit pt-[80%] pl-[10%] lg:pt-[12.5rem] lg:pl-44"
    >
      <icon-line class="mt-[.9rem] mr-[.9rem]"></icon-line>
      <div>
        <p
          class="md:text-3xl lg:text-6xl text-[1.25rem] text-white bg-transparent font-bold lg:w-[60%] md:w-[70%] w-[75%]"
        >
          {{ quote }}
        </p>

        <p class="text-[1rem] text-[#D9D9D9]">{{ movie }}</p>
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
import { computed } from "vue";
export default {
  components: {
    IconLine,
  },
  props: {
    paralax: {
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

    bg: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    const displayParalax = computed(() => {
      return !props.paralax ? "paralax" : "";
    });
    const displayBackground = computed(() => {
      return {
        backgroundImage: `url(${props.bg})`,
      };
    });

    return {
      displayBackground,
      displayParalax,
    };
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
