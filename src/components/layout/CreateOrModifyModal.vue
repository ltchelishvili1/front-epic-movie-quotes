<template>
  <div
    class="fixed top-[1.9rem] -translate-y-[1.9rem] left-0 w-[100vw] h-[100vh] bg-transparent z-50"
    style="background: rgba(0, 0, 0, 0.38)"
    @click="handleOuterClick"
  >
    <div
      class="scrollbar scrollbar-thumb-gray-100 scrollbar-track-gray-900 px-[2rem] rounded-[.6rem] py-[2.4rem] md:w-[62.5rem] lg:w-[62.5rem] w-full absolute left-[50%] top-[50%] -translate-x-[50%] h-[50rem] overflow-y-scroll -translate-y-[50%] h-[63.5] scale-[.9] bg-[#11101A]"
      @click="handleInnerClick"
    >
      <div class="flex items-center justify-center">
        <div
          v-if="isQuote && checkPermission(authorId)"
          class="absolute h-[2.5rem] left-8 flex md:space-x-3 lg:space-x-3 rounded-xl p-2 mb-[2.5rem] -translate-x-[1.25rem] md:-translate-x-[0rem] lg:-translate-x-[0rem]"
        >
          <router-link
            v-if="isQuote === 'view-quote'"
            :to="{ name: 'edit-quote', params: { quoteId } }"
            class="text-white text-center mt-[1.5rem] mr-[.9rem]"
          >
            <icon-edit></icon-edit
          ></router-link>

          <div
            v-if="isQuote === 'view-quote'"
            class="border-r translate-y-[1.6rem]"
          ></div>
          <button
            class="text-white text-center mt-[1.6rem] translate-x-[.9rem]"
            @click="deleteQuote(quoteId)"
          >
            <icon-delete></icon-delete>
          </button>
        </div>
        <button
          class="absolute text-white top-[2.5rem] right-[1.9rem]"
          @click="handleOuterClick"
        >
          X
        </button>
        <h1 v-if="title" class="text-white font-medium text-[1.5rem]">
          {{ title }}
        </h1>

        <div
          class="absolute w-full h-[0.1px] bg-[#EFEFEF] opacity-[0.3] mt-[6.25rem]"
        ></div>
      </div>
      <div
        class="flex text-white items-center justify-start pt-[3.75rem] mb-[1.75rem]"
      >
        <img
          class="mr-[1.25rem] w-[3.75rem] h-[3.75rem] rounded-full"
          :src="displayImage"
        />
        <p class="text-white">{{ userName }}</p>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "@/stores/user/index";
import { displayImage } from "@/config/helpers";
import IconEdit from "@/components/icons/IconEdit.vue";
import IconDelete from "@/components/icons/IconDelete.vue";
import axios from "@/config/axios/index";
import { computed, onMounted, ref } from "vue";

export default {
  components: {
    IconEdit,
    IconDelete,
  },
  props: {
    title: {
      type: String,
      required: false,
      default: "",
    },
    isQuote: {
      type: String,
      required: false,
      default: "",
    },
    link: {
      type: String,
      default: null,
    },
  },

  setup(props) {
    const router = useRouter();
    const route = useRoute();
    const authorId = ref(null);
    const userStore = useUserStore();

    const handleOuterClick = () => {
      if (
        router.options.history.state.back.includes("view-quote") ||
        router.options.history.state.back.includes("add-quote")
      ) {
        router.go(-2);
      } else {
        router.back();
      }
    };
    const handleInnerClick = (event) => {
      event.stopPropagation();
    };
    const deleteQuote = async (id) => {
      try {
        await axios.delete(`quotes/${id}`);
      } catch (error) {
        //
      } finally {
        handleOuterClick();
      }
    };

    onMounted(async () => {
      if (props.isQuote) {
        try {
          const resp = await axios.get("quotes/" + route.params.quoteId);
          authorId.value = resp.data.quote.author_id;
        } catch (error) {
          //
        }
      }
    });

    const checkPermission = computed(() => (id) => userStore.getUser.id === id);

    return {
      handleInnerClick,
      handleOuterClick,
      displayImage,
      quoteId: route.params.quoteId,
      userName: userStore.getUser.username,
      deleteQuote,
      checkPermission,
      authorId,
    };
  },
};
</script>
