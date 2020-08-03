<template>
  <div>
    <b-form @submit.prevent="signInEmail">
      <b-row>
        <b-col>
          <b-form-group label="Email:" label-for="txtEmail">
            <b-form-input type="email" placeholder="Email" class="input" id="txtEmail" required v-model="email"></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-form-group label="Contraseña:" label-for="password">
            <b-form-input placeholder="Contraeña" class="input" type="password" id="password" required v-model="pass"></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-button type="submit" class="button">Iniciar sesión</b-button>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <div @click="forgot" class="forgot">
              <strong>¿Olvidaste tu contraseña?</strong>
          </div>
        </b-col>
      </b-row>
      <SocialMediaAuth />
    </b-form>
  </div>
</template>

<script>
import AuthController from '@/firebase/controllers/AuthController'
import { showToast } from '@/utils/showToast'
import SocialMediaAuth from '@/components/SocialMediaAuth'
const auth = new AuthController()
export default {
  components: { SocialMediaAuth },
  data () {
    return {
      email: '',
      pass: ''
    }
  },
  methods: {
    signInEmail () {
      console.log('Entre al metodo')
      auth.authEmail(this.email, this.pass)
        .then(user => this.$router.push({ path: '/' }))
        .catch(error => showToast(this.$bvToast, 'Error', error.message, 'danger'))
    },
    forgot () {
      if (!this.email) {
        showToast(this.$bvToast, 'Advertencia', 'Ingresa tu email en el campo correspondiente', 'warning')
      } else {
        auth.changePass(this.email).then(() => showToast(this.$bvToast, 'Tarea completa', 'Hemos enviado un correo para cambiar la contraseña', 'success'))
      }
    }
  },
  created () {
    // eslint-disable-next-line no-unused-expressions
    auth.getUser() ? this.$router.push({ path: '/' }) : null
  }
}
</script>
