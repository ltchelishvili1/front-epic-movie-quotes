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
        <div
          v-if="isQuote"
          class="absolute h-[40px] left-8 flex space-x-3 rounded-xl p-2 mb-[40px]"
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
            @click="deleteQuote(quoteId)"
            class="text-white text-center mt-[25px] translate-x-[15px]"
          >
            <icon-delete></icon-delete>
          </button>
        </div>
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

export default {
  components: {
    IconEdit,
    IconDelete,
  },
  props: {
    title: {
      type: String,
      required: false,
    },
    isQuote: {
      type: String,
      required: false,
    },
  },

  setup(props) {
    const router = useRouter();
    const route = useRoute();
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

    return {
      handleInnerClick,
      handleOuterClick,
      displayImage,
      quoteId: route.params.quoteId,
      userName: userStore.getUser.username,
      deleteQuote,
    };
  },
};
</script>
