<template>
  <create-or-modify-modal is-quote="view-quote" :title="$t('view_quote')">
    <view-quote-form></view-quote-form>
  </create-or-modify-modal>
</template>

<script>
import CreateOrModifyModal from "@/components/layout/CreateOrModifyModal.vue";
import ViewQuoteForm from "@/components/view-quote/ViewQuoteForm.vue";

export default {
  components: { CreateOrModifyModal, ViewQuoteForm },
};
</script>
