<template>
  <div
    class="flex items-center justify-start border border-[#6C757D] px-4 py-[10px]"
    @drop.prevent="uploadImage($event.dataTransfer.files[0])"
    @dragover.prevent
  >
    <Field
      name="image"
      id="image"
      type="file"
      accept="image/*"
      style="display: none"
      @input="uploadImage($event.target.files[0])"
    />
    <img
      v-if="displayImage"
      :class="readOnly ? 'w-full' : ''"
      class="w-[188px] h-[188px] cursor-pointer"
      :src="displayImage"
      @click="openFileInput"
    />
    <label v-if="!readOnly" class="text-white text-center cursor-pointer">
      {{ $t("drag_and_drop_image") }}
    </label>
    <button
      v-if="!readOnly"
      type="button"
      class="ml-[20px] text-white text-center cursor-pointer bg-[#9747FF66] p-[10px] rounded"
      @click="openFileInput"
    >
      {{ $t("choose_file") }}
    </button>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { Field } from "vee-validate";
export default {
  props: {
    image: {
      type: String,
      default: null,
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    Field,
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
