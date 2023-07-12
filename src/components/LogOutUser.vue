<template>
  <section>
    <base-button
      v-if="!mobile"
      button-class="google"
      class="mb-[1.1rem] hidden md:block lg:block"
      @click="logOutUser"
    >
      <span v-if="!isLoading.lOut">{{ $t("log_out") }}</span>
      <load-spinner v-else classes="h-[1.9rem] w-[1.9rem]"></load-spinner>
    </base-button>
    <div
      v-else
      class="md:hidden lg:hidden absolute left-[50%] -translate-x-[50%] bottom-[10rem] flex iems-center mt-[2.5rem]"
    >
      <p
        :to="{ name: 'movies' }"
        class="text-white text-2xl"
        @click="logOutUser"
      >
        <span v-if="!isLoading.lOut">{{ $t("log_out") }}</span>
        <load-spinner v-else classes="h-[1.9rem] w-[1.9rem]"></load-spinner>
      </p>
    </div>
  </section>
</template>

<script>
import BaseButton from "@/components/UI/inputs/BaseButton.vue";
import axios from "@/config/axios/index";
import { useUserStore } from "@/stores/user/index";
import LoadSpinner from "@/components/LoadSpinner.vue";
import { useRouter } from "vue-router";

export default {
  components: {
    BaseButton,
    LoadSpinner,
  },
  props: {
    isLoading: {
      type: Object,
      default: () => {},
    },
    mobile: {
      type: Boolean,
      default: false,
    },
  },

  emits: {
    "set-is-loading": (type, bool) => typeof type === "string" && typeof bool === "boolean",
  },
  setup(_, { emit }) {
    const userStore = useUserStore();
    const router = useRouter();

    const logOutUser = async () => {
      localStorage.clear();
      try {
        emit("set-is-loading", "lOut", true);
        await axios.get("logout");
        userStore.setAuth(false);
        router.push({ name: "main" });
      } catch (error) {
        throw new Error(error);
      }
    };

    return {
      logOutUser,
    };
  },
};
</script>
