<template>
  <div
    class="flex items-center border border-[#6C757D] px-4 py-[0.625rem]"
    :class="image ? 'justify-between' : 'justify-start'"
    @drop.prevent="uploadImage($event.dataTransfer.files[0])"
    @dragover.prevent
  >
    <Field
      v-if="!readOnly"
      id="image"
      v-model="imgFile"
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
          : 'cursor-pointer md:w-[50%] lg:w-[50%] lg:h-[11.75rem] md:h-[11.75rem] w-[3.1rem] h-[3.1rem]'
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
      class="ml-[1.25rem] text-white text-center cursor-pointer bg-[#9747FF66] p-[0.625rem] rounded"
      @click="openFileInput"
    >
      {{ $t("choose_file") }}
    </button>
    <div class="mt-[0.375rem]">
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
    const imgFile = ref(null);
    const uploadImage = (file) => {
      emit("upload-image", file);
      imgFile.value = file;
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

    const displayImage = computed(() => (img.value ? img.value : null));

    return {
      uploadImage,
      displayImage,
      openFileInput,
      imgFile,
    };
  },
};
</script>
