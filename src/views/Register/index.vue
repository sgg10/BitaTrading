<template>
  <div>
    <section class="formAuth my-5">
      <section class="formAuth-Container">
        <h2>Registro</h2>
        <Form />
      </section>
    </section>
  </div>
</template>

<script>
import Form from './Form'
export default {
  components: { Form }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/auth.scss';
</style>
