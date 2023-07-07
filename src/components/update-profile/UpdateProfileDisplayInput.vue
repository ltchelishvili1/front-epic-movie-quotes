<template>
  <div>
    <div v-if="title">
      <p  class="font-semibold text-[1rem] text-white">{{
        title
      }}</p>
    </div>
    <input
      :class="
        !isMobile
          ? ' bg-[#CED4DA] border border-[#232323] '
          : ' text-white bg-transparent'
      "
      class="md:w-[28.75rem] h-[2.4rem] p-4 mt-[.5rem]"
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
      default: ''
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
