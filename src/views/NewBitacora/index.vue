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

<style scoped>
  .formCreate{
    background: #ece7e7;
    border: 2px solid #707070;
    border-radius: 40px;
    padding: 15px;
  }
</style>
