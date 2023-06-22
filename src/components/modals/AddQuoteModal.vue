<template>
  <create-or-modify-modal :title="$t('add_quote')">
    <add-quote-form></add-quote-form>
  </create-or-modify-modal>
</template>

<script>
import CreateOrModifyModal from "@/components/layout/CreateOrModifyModal.vue";
import AddQuoteForm from "@/components/add-quote/AddQuoteForm.vue";

export default {
  components: { CreateOrModifyModal, AddQuoteForm },
};
</script>
