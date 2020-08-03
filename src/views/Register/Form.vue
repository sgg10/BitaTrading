<template>
  <div>
    <b-form @submit.prevent="registrarse">
      <b-row>
        <b-col>
          <b-form-group label="Nombre:" label-for="txtNombre">
            <b-form-input type="text" placeholder="Nombre" class="input" id="txtNombre" required v-model="name"></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
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
          <b-form-group label="Confirmar contraseña:" label-for="password2">
            <b-form-input placeholder="Contraeña" class="input" type="password" id="password2" required v-model="pass2"></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-button type="submit" class="button">Registrarse</b-button>
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
      pass: '',
      pass2: '',
      name: ''
    }
  },
  methods: {
    registrarse () {
      this.pass === this.pass2
        ? auth.register(this.name, this.email, this.pass, this.$router)
        : showToast(this.$bvToast, 'Error', 'Las contraeñas deben ser iguales', 'danger')
    }
  },
  created () {
    // eslint-disable-next-line no-unused-expressions
    auth.getUser() ? this.$router.push({ path: '/' }) : null
  }
}
</script>
