<template>
  <div :class="setMobilePosition">
    <Field
      id="image"
      name="image"
      type="file"
      accept=".png, .jpg"

      style="display: none"
      @input="uploadImage($event.target.files[0])"
    />
    <img
      class="w-[11.75rem] h-[11.75rem] rounded-full cursor-pointer"
      :src="displayImage"
      @click="openFileInput"
    />
    <p
      class="text-white text-center mt-[0.625rem] cursor-pointer"
      @click="openFileInput"
    >
      {{ $t("upload_new_photo") }}
    </p>
    <div class="mt-[0.375rem]">
        <ErrorMessage class="text-red-500 ml-4" name="image" />
      </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { Field , ErrorMessage} from "vee-validate";

export default {
  components: {
    Field,
    ErrorMessage
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
  emits:{
    "upload-image": (val) => typeof val instanceof File,
  },
  setup(props, { emit }) {
    const photoInput = ref();

    const uploadImage = (file) => {
      emit("upload-image", file);
    };

    const setMobilePosition = computed(() =>
      props.isMobile ? "-translate-y-[3.1rem]" : "-translate-y-[70%]"
    );

    const openFileInput = () => {
      const temp = document.getElementById("image");
      temp.click();
    };

    return {
      uploadImage,
      setMobilePosition,
      openFileInput,
      photoInput,
    };
  },
};
</script>
