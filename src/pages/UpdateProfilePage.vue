<template>
  <authorized-user-layout>
    <p class="text-white mt-[60px]">{{ $t("my_profile") }}</p>
    <update-profile-page-form class="mt-[60px]"></update-profile-page-form>
  </authorized-user-layout>
</template>
<script>
import AuthorizedUserLayout from "@/components/layout/AuthorizedUserLayout.vue";
import UpdateProfilePageForm from "@/components/update-profile/UpdateProfilePageForm.vue";

export default {
  components: {
    AuthorizedUserLayout,
    UpdateProfilePageForm,
  },
};
</script>
