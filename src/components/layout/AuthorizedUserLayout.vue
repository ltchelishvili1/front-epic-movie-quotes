<template>
  <div>
    <section class="bg-auth-dark min-h-screen">
      <authorize-user-layout-nav
        :notifications="notifications"
        :display-new-notifications-length="displayNewNotificationsLength"
        :is-loading="isLoading"
        @toggle-navbar="toggleNavbar"
        @set-is-loading="setIsLoading"
      ></authorize-user-layout-nav>

      <div class="flex">
        <authorized-user-layout-side-bar
          :display-screen-navbar="displayScreenNavbar"
        ></authorized-user-layout-side-bar>
        <div
          class="flex grow flex-col md:mx-[10%] lg:mx-[10%] mt-[1.9rem]"
          :class="hideNavbar"
        >
          <slot></slot>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import AuthorizeUserLayoutNav from "@/components/authorized-user-layout/AuthorizeUserLayoutNav.vue";

import { useUserStore } from "@/stores/user/index";
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

import axios from "@/config/axios/index";

import instantiatePusher from "@/config/helpers/instantiatePusher.js";
import AuthorizedUserLayoutSideBar from "@/components/authorized-user-layout/AuthorizedUserLayoutSideBar.vue";

export default {
  components: {
    AuthorizeUserLayoutNav,
    AuthorizedUserLayoutSideBar,
  },

  setup() {
    const displayNavbar = ref(false);
    const isMobile = ref(false);
    const userStore = useUserStore();

    const notifications = ref([]);
    const isLoading = ref({
      not: false,
      lOut: false,
    });

    onMounted(async () => {
      instantiatePusher();

      window.Echo.private(`feedback-${userStore.getUser?.id}`).listen(
        "UserFeedBack",
        (dat) => {
          if (userStore.getUser.username !== dat.message.from) {
            notifications.value.unshift(dat.message.notification);
          }
        }
      );
      isLoading.value.not = true;
      const response = await axios.get("notifications");
      isLoading.value.not = false;
      notifications.value = response.data.notifications;
    });

    const updateScreen = () => {
      isMobile.value = window.matchMedia("(max-width: 48rem)").matches;
    };

    updateScreen();

    window.addEventListener("resize", updateScreen);

    onBeforeUnmount(() => {
      window.removeEventListener("resize", updateScreen);
    });

    const hideNavbar = computed(() => (displayNavbar.value ? "hidden" : ""));

    const displayScreenNavbar = computed(
      () => displayNavbar.value || !isMobile.value
    );

    const displayNewNotificationsLength = computed(
      () =>
        notifications.value.filter(
          (notification) => notification.has_user_seen == 0
        ).length
    );

    const toggleNavbar = () => {
      displayNavbar.value = !displayNavbar.value;
    };

    const setIsLoading = (type, bool) => {
      isLoading.value[type] = bool;
    };

    return {
      displayNavbar,
      isMobile,
      hideNavbar,
      displayScreenNavbar,
      notifications,
      displayNewNotificationsLength,
      isLoading,
      toggleNavbar,
      setIsLoading,
    };
  },
};
</script>
