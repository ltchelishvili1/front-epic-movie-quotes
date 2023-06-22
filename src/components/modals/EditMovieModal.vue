<template>
  <create-or-modify-modal :title="$t('edit_movie')">
    <edit-movie-form></edit-movie-form>
  </create-or-modify-modal>
</template>

<script>
import CreateOrModifyModal from "@/components/layout/CreateOrModifyModal.vue";
import EditMovieForm from "@/components/edit-movie/EditMovieForm.vue";
export default {
  components: { CreateOrModifyModal, EditMovieForm },
};
</script>
