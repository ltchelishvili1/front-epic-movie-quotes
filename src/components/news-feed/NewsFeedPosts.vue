<template>
  <section v-if="posts">
    <div
      v-for="post in posts"
      :key="post.id"
      class="text-white md:text-[1.9rem] lg:text-[1.9rem] my-[1.4rem] p-6 bg-[#11101A] rounded-xl w-[100%] md:w-[88%] lg:w-[88%]"
    >
      <div class="flex items-center">
        <img
          class="mr-[1.25rem] w-[3.75rem] h-[3.75rem] rounded-full border-2 border-solid border-[#E31221]"
          :src="post?.user?.thumbnail"
        />
        <p class="text-white ml-4 text-[1.25rem]">{{ post?.user?.username }}</p>
      </div>
      <div>
        <p class="text-white py-4">
          “{{ post?.quote[locale] }}” {{ $t("movie") }}-
          <span class="text-[#DDCCAA]">{{ post?.movie?.title[locale] }}. </span>
          ({{ post?.movie?.release_year }})
        </p>
        <img :src="post?.image" class="w-full rounded-lg h-[31.25rem]" />
        <div>
          <div class="flex items-center">
            <div class="flex items-center mr-6">
              <p class="text-white text-[1.25rem]">
                {{ post?.comments?.length || 0 }}
              </p>
              <icon-comments class="ml-3"></icon-comments>
            </div>
            <button
              class="text-white flex items-center text-[1.25rem] my-[1.5rem]"
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
                v-if="!isLoading.like"
                :is-selected="hasUserLikedPost(post?.likes)"
                class="ml-3"
              ></icon-likes>
              <load-spinner
                v-else
                classes="h-[1.9rem] w-[1.9rem] ml-3"
              ></load-spinner>
            </button>
          </div>

          <div v-if="post?.comments && post?.comments.length" class="relative">
            <div
              v-for="(com, index) in sortedComments(post?.comments)"
              :key="com.id"
              class="mb-4"
            >
              <div
                v-if="index <= 1 || displayComments[post.id + 'comments']"
                class="flex items-center"
              >
                <img
                  class="w-[3.25rem] h-[3.25rem] rounded-full lg:mx-6 md:mx-6 mx-2"
                  :src="com?.user?.thumbnail"
                />
                <div class="w-[80%] mt-[2.3rem] ml-[1.25rem]">
                  <p class="text-white text-[1.25rem]">
                    {{ com?.user?.username }}
                  </p>
                  <p
                    class="text-white text-[1.25rem] break-words w-full mt-[0.6875rem] mb-6"
                  >
                    {{ com?.comment }}
                  </p>
                  <div
                    v-if="index != post?.comments.length - 1"
                    class="w-full h-[0.07rem] bg-[#EFEFEF] opacity-[0.3] mt-[1.5rem]"
                  ></div>
                </div>
              </div>
            </div>
            <button
              v-if="post?.comments?.length > 2"
              class="text-[.75rem] absolute right-[0rem] -translate-x-[100%]"
              @click="toggleComments(post?.id)"
            >
              {{
                !displayComments[post.id + "comments"]
                  ? $t("show_more")
                  : $t("show_less")
              }}
            </button>
          </div>

          <div class="flex items-center mt-12">
            <img
              class="w-[3.25rem] h-[3.25rem] rounded-full lg:mx-6 md:mx-6 mx-2"
              :src="userStore.getUser.thumbnail"
            />
            <vee-validate-form
              v-slot="{ meta }"
              class="w-full relative ml-[0.625rem]"
              @submit="addComment(post?.id, post?.user_id, post?.comments)"
            >
              <Field
                id="comment"
                v-model="comment"
                as="textarea"
                rules="required"
                name="comment"
                rows="2"
                style="background-color: #22203099"
                class="w-full text-white bg-transparent flex p-4 h-[5rem] rounded-lg mt-[.5rem] z-[10]"
                :placeholder="$t('write_a_comment')"
              />
              <button
                :disabled="!meta.valid"
                :class="!meta.valid ? 'opacity-30' : ''"
                class="absolute right-[0.625rem] bottom-[50%] translate-y-[60%] text-white text-[.9rem] cursor-pointer"
              >
                <span v-if="!isLoading.comment">
                  {{ $t("send") }}
                </span>
                <load-spinner
                  v-else
                  classes="h-[1.6rem] w-[1.6rem]"
                ></load-spinner>
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
import LoadSpinner from "@/components/LoadSpinner.vue";

export default {
  components: {
    VeeValidateForm: Form,
    IconLikes,
    IconComments,
    Field,
    LoadSpinner,
  },
  props: {
    posts: {
      type: Array,
      required: true,
    },
  },
  setup() {
    const displayComments = ref({});
    const comment = ref("");
    const userStore = useUserStore();
    const locale = getLocale();
    const isLoading = ref({
      like: false,
      comment: false,
    });

    const handleLikePost = async (
      quote_id,
      quote_user_id,
      hasAlreadyLiked,
      likes
    ) => {
      isLoading.value.like = true;
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
      isLoading.value.like = false;
    };

    const hasUserLikedPost = computed(() => (likes) => {
      return likes.map((like) => like.user_id).includes(userStore.getUser.id);
    });

    const addComment = async (quote_id, quote_user_id) => {
      isLoading.value.comment = true;
      try {
        await axios.post("comments", {
          quote_id,
          quote_user_id,
          comment: comment.value,
        });
      } catch (error) {
        //
      } finally {
        comment.value = "";
        isLoading.value.comment = false;
        displayComments.value[quote_id + "comments"] = false;
      }
    };

    const toggleComments = (id) => {
      displayComments.value[id + "comments"] =
        !displayComments.value[id + "comments"];
    };

    const sortedComments = computed(() => (comments) => {
      return comments.sort((a, b) => b.id - a.id);
    });

    return {
      handleLikePost,
      hasUserLikedPost,
      toggleComments,
      displayComments,
      addComment,
      comment,
      userStore,
      locale,
      isLoading,
      sortedComments,
    };
  },
};
</script>
