<template>
  <section>
    <div
      v-for="post in posts"
      :key="post.id"
      class="text-white md:text-[30px] lg:text-[30px] my-[22px] p-6 bg-[#11101A] rounded-xl w-[100%] md:w-[88%] lg:w-[88%]"
    >
      <div class="flex items-center">
        <img
          class="mr-[20px] w-[60px] h-[60px] rounded-full border-2 border-solid border-[#E31221]"
          :src="post?.user?.thumbnail"
        />
        <p class="text-white ml-4 text-[20px]">{{ post?.user?.username }}</p>
      </div>
      <div>
        <p class="text-white py-4">
          “{{ post?.quote[locale] }}” {{ $t("movie") }}-
          <span class="text-[#DDCCAA]">{{ post?.movie?.title[locale] }}. </span>
          ({{ post?.movie?.release_year }})
        </p>
        <img :src="post?.image" class="w-full rounded-lg h-[500px]" />
        <div>
          <div class="flex items-center">
            <div class="flex items-center mr-6">
              <p class="text-white text-[20px]">
                {{ post?.comments?.length || 0 }}
              </p>
              <icon-comments class="ml-3"></icon-comments>
            </div>
            <button
              class="text-white flex items-center text-[20px] my-[24px]"
              @click="
                handleLikePost(
                  post?.id,
                  post?.user_id,
                  hasUserLikedPost(post?.likes),
                  post?.likes
                )
              "
            >
              {{ post?.likes?.length || 0 }}
              <icon-likes
                :is-selected="hasUserLikedPost(post?.likes)"
                class="ml-3"
              ></icon-likes>
            </button>
          </div>

          <div v-if="post?.comments && post?.comments.length" class="relative">
            <div
              v-for="(com, index) in post?.comments"
              :key="com.id"
              class="mb-4"
            >
              <div
                v-if="index <= 1 || displayComments"
                class="flex items-center"
              >
                <img
                  class="w-[52px] h-[52px] rounded-full lg:mx-6 md:mx-6 mx-2"
                  :src="com?.user?.thumbnail"
                />
                <div class="w-[80%] mt-[35px] ml-[20px]">
                  <p class="text-white text-[20px]">
                    {{ com?.user?.username }}
                  </p>
                  <p
                    class="text-white text-[20px] break-words w-full mt-[11px] mb-6"
                  >
                    {{ com?.comment }}
                  </p>
                  <div
                    v-if="index != post?.comments.length - 1"
                    class="w-full h-[0.1px] bg-[#EFEFEF] opacity-[0.3] mt-[24px]"
                  ></div>
                </div>
              </div>
            </div>
            <button
              class="text-[12px] absolute right-[0px] -translate-x-[100%]"
              @click="toggleComments"
            >
              {{ !displayComments ? $t("show_more") : $t("show_less") }}
            </button>
          </div>

          <div class="flex items-center mt-12">
            <img
              class="w-[52px] h-[52px] rounded-full lg:mx-6 md:mx-6 mx-2"
              :src="userStore.getUser.thumbnail"
            />
            <vee-validate-form
              v-slot="{ meta }"
              class="w-full relative ml-[10px]"
              @submit="addComment(post?.id, post?.user_id, post?.comments)"
            >
              <Field
                id="comment"
                as="textarea"
                rules="required"
                name="comment"
                rows="2"
                style="background-color: #22203099"
                class="w-full text-white bg-transparent flex p-4 h-[80px] rounded-lg mt-[8px] z-[10]"
                :placeholder="$t('write_a_comment')"
                :value="comment"
                @input="setComment"
              />
              <button
                :disabled="!meta.valid"
                class="absolute right-[10px] bottom-[15px] text-white"
              >
                send
              </button>
            </vee-validate-form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { Field, Form } from "vee-validate";
import { ref, computed } from "vue";
import axios from "@/config/axios/index";
import { useUserStore } from "@/stores/user/index";
import IconLikes from "@/components/icons/IconLikes.vue";
import IconComments from "@/components/icons/IconComments.vue";
import { getLocale } from "@/config/helpers/index";

export default {
  components: {
    VeeValidateForm: Form,
    IconLikes,
    IconComments,
    Field,
  },
  props: {
    posts: {
      type: Array,
      required: true,
    },
  },
  setup() {
    const displayComments = ref(false);
    const comment = ref("");
    const userStore = useUserStore();
    const locale = getLocale();

    const handleLikePost = async (
      quote_id,
      quote_user_id,
      hasAlreadyLiked,
      likes
    ) => {
      if (!hasAlreadyLiked) {
        try {
          await axios.post("likes", {
            quote_id,
          });
        } catch (error) {
          //
        }
      } else {
        const likeId = likes.find(
          (like) => like.user_id === userStore.getUser.id
        ).id;
        try {
          await axios.delete(`likes/${likeId}`, {
            quote_id,
            quote_user_id,
          });

          const index = likes.findIndex((like) => like.id === likeId);
          if (index !== -1) {
            likes.splice(index, 1);
          }
        } catch (error) {
          //
        }
      }
    };

    const hasUserLikedPost = computed(() => (likes) => {
      return likes.map((like) => like.user_id).includes(userStore.getUser.id);
    });

    const addComment = async (quote_id, quote_user_id) => {
      displayComments.value = true;
      try {
        await axios.post("comments", {
          quote_id,
          quote_user_id,
          comment: comment.value,
        });
      } catch (error) {
        //
      }
    };

    const toggleComments = () => {
      displayComments.value = !displayComments.value;
    };

    const setComment = (e) => {
      comment.value = e.target.value;
    };

    return {
      handleLikePost,
      hasUserLikedPost,
      toggleComments,
      displayComments,
      addComment,
      comment,
      userStore,
      locale,
      setComment,
    };
  },
};
</script>
