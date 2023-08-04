<template>
  <div
    class="lg:flex grid md:justify-start justify-center gap-12 md:-translate-x-[100px] lg:-translate-x-[100px]"
  >
    <img
      :src="user?.thumbnail"
      class="lg:w-[600px] md:w-[600px] w-[300px] ml-6 rounded-xl"
    />
    <div class="mt-4 ml-[10%] lg:mt-8 md:mt-8">
      <h1 class="text-white text-xl md:flex lg:flex block justify-between">
        <p>{{ $t("username") }}:</p>
        <p class="italic text-2xl">{{ user?.username }}</p>
      </h1>
      <h1 class="text-white text-xl md:flex lg:flex block justify-between mt-4">
        <p class="w-[150px]">{{ $t("mail") }}:</p>
        <p class="italic md:ml-12 lg:ml-12">{{ user?.email }}</p>
      </h1>
      <h1 class="text-white text-xl md:flex lg:flex block justify-between mt-4">
        <p>{{ $t("likes_received") }}:</p>
        <p class="italic">{{ user?.likes }}</p>
      </h1>
      <h1 class="text-white text-xl md:flex lg:flex block justify-between mt-4">
        <p>{{ $t("comments_received") }}:</p>
        <p class="italic">{{ user?.comments }}</p>
      </h1>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      default: () => {},
    },
  },
};
</script>
