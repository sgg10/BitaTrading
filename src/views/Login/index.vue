<template>
  <div>
    <section class="formAuth my-5">
      <section class="formAuth-Container">
        <h2>Iniciar sesión</h2>
        <Form/>
      </section>
    </section>
  </div>
</template>

<script>
import Form from './Form'
export default {
  name: 'Login',
  components: { Form }
}
</script>

<style lang="scss">
@import '@/assets/css/auth.scss';
  .forgot{
      cursor: pointer;
  }
  .forgot:hover{
      color: #414141;
  }
  .loginButton{
      cursor: pointer;
  }
</style>
