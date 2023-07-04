<template>
  <div
    class="flex items-center justify-start border border-[#6C757D] px-4 py-[10px]"
    @drop.prevent="uploadImage($event.dataTransfer.files[0])"
    @dragover.prevent
  >
    <Field
      v-if="!readOnly"
      id="image"
      name="image"
      type="file"
      :rules="rules"
      accept=".png, .jpg"
      style="display: none"
      @input="uploadImage($event.target.files[0])"
    />
    <img
      v-if="displayImage"
      :class="
        readOnly
          ? 'w-full'
          : 'cursor-pointer md:w-[188px] lg:w-[188px] lg:h-[188px] md:h-[188px] w-[50px] h-[50px]'
      "
      :src="displayImage"
      @click="openFileInput"
    />
    <p v-if="!readOnly" class="text-white text-center cursor-pointer">
      {{ $t("drag_and_drop_image") }}
    </p>
    <button
      v-if="!readOnly"
      type="button"
      class="ml-[20px] text-white text-center cursor-pointer bg-[#9747FF66] p-[10px] rounded"
      @click="openFileInput"
    >
      {{ $t("choose_file") }}
    </button>
    <div class="mt-[6px]">
      <ErrorMessage class="text-red-500 ml-4" name="image" />
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { Field, ErrorMessage } from "vee-validate";
export default {
  components: {
    Field,
    ErrorMessage,
  },
  props: {
    image: {
      type: String,
      default: null,
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
    rules: {
      type: String,
      default: "required",
    },
  },
  emits: {
    "upload-image": (val) => typeof val instanceof File,
  },

  setup(props, { emit }) {
    const img = ref(props.image);
    const uploadImage = (file) => {
      emit("upload-image", file);
      const reader = new FileReader();

      reader.onload = () => {
        img.value = reader.result;
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    };

    const openFileInput = () => {
      const temp = document.getElementById("image");
      temp.click();
    };

    const displayImage = computed(() => (img.value ? img.value : ""));

    return {
      uploadImage,
      displayImage,
      openFileInput,
    };
  },
};
</script>
