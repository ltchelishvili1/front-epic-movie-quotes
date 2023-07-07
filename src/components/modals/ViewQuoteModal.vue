<template>
  <authorized-user-layout >
    <create-or-modify-modal is-quote="view-quote" :title="$t('view_quote')">
    <view-quote-form class="z-[100]"></view-quote-form>
  </create-or-modify-modal>
  </authorized-user-layout>
</template>

<script>
import CreateOrModifyModal from "@/components/layout/CreateOrModifyModal.vue";
import ViewQuoteForm from "@/components/view-quote/ViewQuoteForm.vue";
import AuthorizedUserLayout from '../layout/AuthorizedUserLayout.vue';

export default {
  components: { CreateOrModifyModal, ViewQuoteForm,AuthorizedUserLayout },
};
</script>
