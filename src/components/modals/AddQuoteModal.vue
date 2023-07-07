<template>
  <authorized-user-layout>
    <create-or-modify-modal :title="$t('add_quote')">
      <add-quote-form></add-quote-form>
    </create-or-modify-modal>
  </authorized-user-layout>
</template>

<script>
import CreateOrModifyModal from "@/components/layout/CreateOrModifyModal.vue";
import AddQuoteForm from "@/components/add-quote/AddQuoteForm.vue";
import AuthorizedUserLayout from "@/components/layout/AuthorizedUserLayout.vue";

export default {
  components: { CreateOrModifyModal, AddQuoteForm, AuthorizedUserLayout },
};
</script>
