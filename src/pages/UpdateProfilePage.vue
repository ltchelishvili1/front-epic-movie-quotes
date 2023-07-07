<template>
  <authorized-user-layout>
    <router-view></router-view>
    <p class="text-white mb-[5rem] ml-8 md:ml-0 lg:ml-0" >{{ $t("my_profile") }}</p>
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
