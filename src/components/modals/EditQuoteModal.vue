<template>
  <authorized-user-layout>
    <create-or-modify-modal is-quote="quote-edit" :title="$t('edit_quote')">
      <edit-quote-form></edit-quote-form>
    </create-or-modify-modal>
  </authorized-user-layout>
</template>

<script>
import CreateOrModifyModal from "@/components/layout/CreateOrModifyModal.vue";
import EditQuoteForm from "@/components/edit-movie/EditQuoteForm.vue";
import AuthorizedUserLayout from "@/components/layout/AuthorizedUserLayout.vue";
export default {
  components: { CreateOrModifyModal, EditQuoteForm, AuthorizedUserLayout },
};
</script>
