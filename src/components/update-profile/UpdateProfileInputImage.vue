<template>
  <div :class="setMobilePosition">
    <input
      ref="photoInput"
      type="file"
      accept="image/*"
      style="display: none"
      @input="uploadImage($event.target.files[0])"
    />
    <img
      class="w-[188px] h-[188px] rounded-full cursor-pointer"
      :src="displayImage"
      @click="$refs.photoInput.click()"
    />
    <p
      class="text-white text-center mt-[10px] cursor-pointer"
      @click="$refs.photoInput.click()"
    >
      {{ $t("upload_new_photo") }}
    </p>
  </div>
</template>

<script>
import { computed } from "vue";
export default {
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
    const uploadImage = (file) => {
      emit("upload-image", file);
    };

    const setMobilePosition = computed(() =>
      isMobile ? "-translate-y-[50px]" : "-translate-y-[70%]"
    );

    return {
      uploadImage,
      setMobilePosition,
    };
  },
};
</script>
