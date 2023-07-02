<template>
  <div
    class="fixed top-[30px] left-0 w-[100vw] h-[100vh] bg-transparent z-50"
    @click="handleOuterClick"
  >
    <div
      class="px-[32px] rounded-[10px] py-[36px] md:w-[600px] lg:w-[600px] w-full absolute left-[50%] top-[50%] -translate-x-[50%] h-[800px] overflow-y-scroll -translate-y-[50%] h-[1000px] scale-[.9] bg-[#11101A]"
      @click="handleInnerClick"
    >
      <div class="flex items-center justify-center">
        <div
          v-if="isQuote && checkPermission(authorId)"
          class="absolute h-[40px] left-8 flex md:space-x-3 lg:space-x-3 rounded-xl p-2 mb-[40px] -translate-x-[20px] md:-translate-x-[0px] lg:-translate-x-[0px]"
        >
          <router-link
            v-if="isQuote === 'view-quote'"
            :to="{ name: 'edit-quote', params: { quoteId } }"
            class="text-white text-center mt-[25px] mr-[15px]"
          >
            <icon-edit></icon-edit
          ></router-link>

          <div
            v-if="isQuote === 'view-quote'"
            class="border-r translate-y-[25px]"
          ></div>
          <button
            class="text-white text-center mt-[25px] translate-x-[15px]"
            @click="deleteQuote(quoteId)"
          >
            <icon-delete></icon-delete>
          </button>
        </div>
        <button
          class="absolute text-white top-[40px] right-[30px]"
          @click="handleOuterClick"
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
  },

  setup(props) {
    const router = useRouter();
    const route = useRoute();
    const authorId = ref(null);
    const userStore = useUserStore();
    const handleOuterClick = () => {
      if (props.isQuote) {
        router.push({ name: "checkmovie", params: { id: route.params.id } });
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
