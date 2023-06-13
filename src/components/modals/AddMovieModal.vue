<template>
   <create-or-modify-modal :title="$t('add_movie')" >
      <add-movie-form></add-movie-form>
   </create-or-modify-modal>
</template>

<script>
import CreateOrModifyModal from '@/components/layout/CreateOrModifyModal.vue'
import AddMovieForm from '@/components/add-movie/AddMovieForm.vue';
export default {
  components: { CreateOrModifyModal, AddMovieForm },
}
</script>