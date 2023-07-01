<template>
  <section>
    <are-you-sure-modal
      v-if="isOpenAreYouSure"
      @cancel="toggleAreYouSure"
      @update-profile="updateProfile"
    ></are-you-sure-modal>
    <successfully-updated-modal
      v-if="isSuccesfullyUpdated"
      @cancel="toggleIsSucessfullyUpdated"
    ></successfully-updated-modal>
    <vee-validate-form
      class="-translate-y-[100px] flex flex-col items-center justify-center"
      @submit="toggleAreYouSure"
    >
      <div
        class="-translate-x-[10px] bg-[#11101A] mt-[100px] flex flex-col items-center justify-center py-[60px] min-w-[100%]"
      >
        <update-profile-input-image
          :display-image="displayImage"
          :is-mobile="isMobile"
          @upload-image="uploadImage"
        ></update-profile-input-image>
        <update-profile-input-wrapper
          :is-mobile="isMobile"
          :hide-extra-fields="hideExtraFields"
          @display-form="displayForm('username')"
        >
          <update-profile-display-input
            :title="$t('username')"
            name="username"
            :value="user.getUser.username"
            :is-mobile="isMobile"
          ></update-profile-display-input>
          <template #update-input>
            <update-profile-input
              v-if="display.username"
              :title="$t('new_username')"
              name="username"
              :placeholder="$t('name_placeholder')"
              rules="required|min:3|max:15"
              :hide="hideExtraFields"
              :is-mobile="isMobile"
              @set-input-value="setInputValue"
            ></update-profile-input>
          </template>
        </update-profile-input-wrapper>
        <update-profile-input-wrapper
          :is-mobile="isMobile"
          :hide-extra-fields="hideExtraFields"
          :google-id="user.getUser.google_id"
          @display-form="displayForm('email')"
        >
          <update-profile-display-input
            :title="$t('mail')"
            name="email"
            :value="user.getUser.email"
            :is-mobile="isMobile"
          ></update-profile-display-input>
          <template #update-input>
            <update-profile-input
              v-if="display.email"
              :title="$t('new_email')"
              name="email"
              :placeholder="$t('email_placeholder')"
              rules="required|email"
              :hide="hideExtraFields"
              :is-mobile="isMobile"
              @set-input-value="setInputValue"
            ></update-profile-input>
          </template>
        </update-profile-input-wrapper>

        <update-profile-input-wrapper
          :is-mobile="isMobile"
          :hide-extra-fields="hideExtraFields"
          :google-id="user.getUser.google_id"
          @display-form="displayForm('password')"
        >
          <update-profile-display-input
            :title="$t('password')"
            name="password"
            value="Password"
            type="password"
            :is-mobile="isMobile"
          ></update-profile-display-input>
          <template #update-input>
            <update-profile-input
              v-if="display.password"
              :title="$t('new_password')"
              name="password"
              type="password"
              :placeholder="$t('password_placeholder')"
              rules="required|min:8|max:15"
              :hide="hideExtraFields"
              :is-mobile="isMobile"
              @set-input-value="setInputValue"
            ></update-profile-input>
          </template>
        </update-profile-input-wrapper>
      </div>

      <p v-if="errors" class="ml-[300px] text-red-500 ml-4">{{ errors }}</p>
      <div
        v-if="displayFormButtons"
        class="absolute -bottom-[80px] flex items-center justify-end"
      >
        <button
          class="text-white pt-[20px] pr-[30px] mb-2 sm:mb-0"
          type="button"
          @click="clearData"
        >
          {{ $t("cancel") }}
        </button>
        <base-button class="w-[160px] sm:w-auto" button-class="primary">
          {{ $t("save_changes") }}
        </base-button>
      </div>
    </vee-validate-form>
  </section>
</template>

<script>
import BaseButton from "@/components/UI/inputs/BaseButton.vue";
import UpdateProfileInput from "@/components/UI/inputs/UpdateProfileInput.vue";

import UpdateProfileDisplayInput from "@/components/update-profile/UpdateProfileDisplayInput.vue";
import UpdateProfileInputWrapper from "@/components/update-profile/UpdateProfileInputWrapper.vue";
import UpdateProfileInputImage from "@/components/update-profile/UpdateProfileInputImage.vue";

import NoUserImage from "@/assets/images/NoUserImage.png";

import { Form, useForm } from "vee-validate";
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";

import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "@/stores/user/index";

import axios from "@/config/axios/index";
import AreYouSureModal from "@/components/modals/AreYouSureModal.vue";
import SuccessfullyUpdatedModal from "@/components/modals/SuccessfullyUpdatedModal.vue";

export default {
  components: {
    UpdateProfileInput,
    BaseButton,
    VeeValidateForm: Form,
    UpdateProfileDisplayInput,
    UpdateProfileInputWrapper,
    UpdateProfileInputImage,
    AreYouSureModal,
    SuccessfullyUpdatedModal,
  },
  setup() {
    const formData = ref(new FormData());
    const errorMessage = ref(null);
    const route = useRoute();
    const router = useRouter();
    const { handleSubmit } = useForm();
    const userStore = useUserStore();
    const img = ref(null);
    const isOpenAreYouSure = ref(false);
    const isSuccesfullyUpdated = ref(false);
    const display = ref(
      JSON.parse(localStorage.getItem("display")) || {
        username: false,
        email: false,
        password: false,
      }
    );

    const isMobile = ref(false);
    const updateScreen = () => {
      isMobile.value = window.matchMedia("(max-width: 768px)").matches;
    };

    const toggleAreYouSure = () => {
      isOpenAreYouSure.value = !isOpenAreYouSure.value;
    };

    const toggleIsSucessfullyUpdated = () => {
      isSuccesfullyUpdated.value = !isSuccesfullyUpdated.value;
    };

    updateScreen();

    window.addEventListener("resize", updateScreen);

    onBeforeUnmount(() => {
      window.removeEventListener("resize", updateScreen);
    });

    const handleClick = async () => {};

    const saveDisplayToLocalStorage = () => {
      localStorage.setItem("display", JSON.stringify(display.value));
    };

    const displayForm = (name) => {
      display.value[name] = !display.value[name];
      saveDisplayToLocalStorage();
    };

    const displayFormButtons = computed(
      () => Object.values(display.value).includes(true) || img.value !== null
    );

    const setInputValue = ({ key, value }) => {
      formData.value.set(key, value);
    };

    onMounted(() => {
      saveDisplayToLocalStorage();
    });

    const updateProfile = handleSubmit(async () => {
      formData.value.append("_method", "patch");

      if (formData.value.get("email")) {
        try {
           await axios.post("user-email-update", formData.value, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          });
        } catch (error) {
          errorMessage.value = error.response.data.message;
        } finally {
          formData.value.delete("email");
          router.push({
            name: "edit-email-request-send",
            params: { email: "fegre" },
          });
        }
      }

      try {
        const response = await axios.post("user", formData.value, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        });

        userStore.setUser(response.data);

        if (response.status !== 200) {
          throw new Error("Request failed with status " + response.status);
        }
        isOpenAreYouSure.value = false;
        isSuccesfullyUpdated.value = true;
      } catch (error) {
        errorMessage.value = error.response.data.message;
      }
    });

    const displayImage = computed(() =>
      img.value
        ? img.value
        : userStore.getUser.thumbnail
        ? userStore.getUser.thumbnail
        : formData.value.get("photo")
        ? formData.value.get("photo")
        : NoUserImage
    );

    const uploadImage = (file) => {
      formData.value.set("photo", file);

      const reader = new FileReader();

      reader.onload = () => {
        img.value = reader.result;
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    };

    const clearData = () => {
      display.value.email = false;
      display.value.username = false;
      display.value.password = false;
      saveDisplayToLocalStorage();
    };

    const mobileDisplayForm = computed(
      () => !Object.values(display.value).includes(true)
    );

    const hideExtraFields = computed(() => {
      if (isMobile.value) {
        return !Object.values(display.value).includes(true);
      }
      return true;
    });

    watch(isSuccesfullyUpdated, () => {
      setTimeout(() => {
        isSuccesfullyUpdated.value = false;
      }, 3000);
    });

    return {
      route,
      handleClick,
      user: userStore,
      displayForm,
      setInputValue,
      display,
      displayFormButtons,
      updateProfile,
      errors: errorMessage,
      uploadImage,
      displayImage,
      clearData,
      isMobile,
      mobileDisplayForm,
      hideExtraFields,
      toggleAreYouSure,
      isOpenAreYouSure,
      toggleIsSucessfullyUpdated,
      isSuccesfullyUpdated,
    };
  },
};
</script>
