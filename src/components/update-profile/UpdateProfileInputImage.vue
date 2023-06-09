<template>
  <div :class="setMobilePosition">
    <Field
      name="image"
      id="image"
      type="file"
      accept="image/*"
      style="display: none"
      @input="uploadImage($event.target.files[0])"
    />
    <img
      class="w-[188px] h-[188px] rounded-full cursor-pointer"
      :src="displayImage"
      @click="openFileInput"
    />
    <p
      class="text-white text-center mt-[10px] cursor-pointer"
      @click="openFileInput"
    >
      {{ $t("upload_new_photo") }}
    </p>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { Field } from "vee-validate";

export default {
  components: {
    Field
  },
  props: {
    isMobile: {
      type: Boolean,
      required: true,
    },

    displayImage: {
      type: String,
      required: true,
    },
  },
  setup({ isMobile }, { emit }) {

    const photoInput = ref();

    const uploadImage = (file) => {
      emit("upload-image", file);
    };

    const setMobilePosition = computed(() =>
      isMobile ? "-translate-y-[50px]" : "-translate-y-[70%]"
    );

    const openFileInput = () => {
      const temp = document.getElementById("image");
      temp.click();
    };

    return {
      uploadImage,
      setMobilePosition,
      openFileInput,
      photoInput
    };
  },
};
</script>
