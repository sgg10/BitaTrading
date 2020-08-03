<template>
    <div>
        <hr>
        <b-row class="mb-3">
            <b-col>
                <h5>O inicia sesión con</h5>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-img @click="signInGoogle" class="loginButton" src="https://img.icons8.com/color/48/000000/google-logo.png" width="50" height="50" rounded="circle" alt="Circle image"></b-img>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import AuthController from '@/firebase/controllers/AuthController'
import { showToast } from '@/utils/showToast'
const auth = new AuthController()
export default {
  methods: {
    signInGoogle () {
      auth.authGoogle().then(() => this.$router.push({ path: '/' })).catch(error => showToast(this.$bvToast, 'Error', error.message, 'danger'))
    }
  }
}
</script>
