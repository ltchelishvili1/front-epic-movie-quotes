<template>
   <create-or-modify-modal isQuote="quote-edit" :title="$t('edit_quote')" >
      <edit-quote-form></edit-quote-form>
   </create-or-modify-modal>
</template>

<script>
import CreateOrModifyModal from '@/components/layout/CreateOrModifyModal.vue'
import EditQuoteForm from '@/components/edit-movie/EditQuoteForm.vue';
export default {
  components: { CreateOrModifyModal, EditQuoteForm },
}
</script>