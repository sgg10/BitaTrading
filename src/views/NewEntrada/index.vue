<template>
  <div class="mt-5">
    <b-container class="formCreate text-left">
      <Form/>
    </b-container>
  </div>
</template>

<script>
import Form from './Form'
export default {
  components: { Form }
}
</script>

<style lang="scss">
  @import '@/assets/css/forms.scss';
</style>
