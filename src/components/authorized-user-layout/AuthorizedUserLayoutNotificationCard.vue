<template>
  <div class="p-4 z-[100]">
    <load-spinner
      v-if="isLoading.not"
      class="absolute top-0 left-0"
      classes="h-[30px] w-[30px]"
    ></load-spinner>

    <div
      v-for="notification in notifications"
      v-else
      :key="notification.id"
      class="md:flex lg:flex p-4 border border-[#6C757D] justify-between cursor-pointer"
      @click="handleNotificationClick(notification)"
    >
      <div class="flex">
        <img
          :src="notification.notification_sender.thumbnail"
          class="w-[60px] h-[60px] rounded-full border-4 border-solid mx-4"
          :class="!notification.has_user_seen ? ' border-green-600' : ''"
        />
        <div>
          <p class="text-white">
            {{ notification.notification_sender.username }}
          </p>
          <p
            v-if="notification.type === 'comment'"
            class="break-words text-white flex items-center mt-2 md:text-normal lg:text-normal text-[14px]"
          >
            <icon-comments class="h-[20px] mr-2"></icon-comments>

            {{ $t("commented_to_your_movie_quote") }}
          </p>
          <p v-else class="text-white flex items-center mt-2">
            <icon-likes
              :is-selected="true"
              class="w-[20px] h-[20px] mr-2"
            ></icon-likes>
            {{ $t("reacted_to_your_quote") }}
          </p>
        </div>
      </div>

      <div>
        <p class="text-white">
          {{ displayDate(notification.created_at, notification.id) }}
        </p>

        <p
          v-if="!notification.has_user_seen"
          class="text-white float-right -translate-y-[25px] md:-translate-y-[0px] lg:-translate-y-[0px]"
        >
          {{ $t("new") }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import axios from "@/config/axios/index";
import LoadSpinner from "@/components/LoadSpinner.vue";
import IconComments from "@/components/icons/IconComments.vue";
import IconLikes from "../icons/IconLikes.vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

export default {
  components: {
    LoadSpinner,
    IconComments,
    IconLikes,
  },
  props: {
    isLoading: {
      type: Object,
      default: () => {},
    },
    notifications: {
      type: Object,
      default: () => {},
    },
  },
  setup() {
    const router = useRouter();
    const handleNotificationClick = async (notification) => {
      const formData = new FormData();
      formData.set("id", notification.id);
      formData.append("_method", "patch");

      try {
        await axios.post("notifications", formData);
        notification.has_user_seen = true;
        router.push({
          name: "view-quote",
          params: {
            quoteId: notification.quote.quote_id,
            id: notification.quote.movie_id,
          },
        });
      } catch (error) {
        //
      }
    };

    const displayDate = computed(() => (time) => {
      const { t } = useI18n();
      const currentTime = new Date();
      const pastTime = new Date(time);
      const timeDifference = Math.round((currentTime - pastTime) / 60000);

      if (timeDifference < 60) {
        return timeDifference + " " + t("minutes_ago");
      } else if (timeDifference < 1440) {
        const hours = Math.floor(timeDifference / 60);
        return hours + " " + t("hours_ago");
      } else if (timeDifference < 10080) {
        const days = Math.floor(timeDifference / 1440);
        return days + " " + t("days_ago");
      } else if (timeDifference < 43200) {
        const weeks = Math.floor(timeDifference / 10080);
        return weeks + " " + t("weeks_ago");
      } else if (timeDifference < 525600) {
        const months = Math.floor(timeDifference / 43200);
        return months + " " + t("monts_ago");
      } else {
        const years = Math.floor(timeDifference / 525600);
        return years + " " + t("years_ago");
      }
    });

    return {
      handleNotificationClick,
      displayDate,
    };
  },
};
</script>
