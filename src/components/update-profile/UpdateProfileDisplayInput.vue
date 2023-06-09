<template>
  <div>
    <div v-if="title">
      <label :for="name" class="font-semibold text-[16px] text-white">{{
        title
      }}</label>
    </div>
    <input
      :class="
        !isMobile ? ' bg-[#CED4DA] border border-[#232323] ' : ' text-white bg-transparent'
      "
      class="md:w-[460px] h-[38px] p-4 mt-[8px] "
      :value="value"
      :type="type"
      readonly
    />
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "text",
    },
    isMobile: {
      type: Boolean,
      required: true,
    },
  },
};
</script>
