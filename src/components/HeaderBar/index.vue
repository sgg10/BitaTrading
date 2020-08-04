<template>
    <div class="header">
        <b-navbar toggleable="lg" type="dark" >
            <b-navbar-brand class="logo" @click="$router.push({name: 'Home'})">BitaTrading</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
                <b-nav-item-dropdown right v-if="user">
                    <!-- Using 'button-content' slot -->
                    <template v-slot:button-content>
                        <b-avatar :src="user.photoURL || ''"></b-avatar>
                    </template>
                    <b-dropdown-item @click="logOut">Cerrar sesión</b-dropdown-item>
                </b-nav-item-dropdown>
                <div v-else>
                    <b-button @click="go('Register')" class="botones bg-success mr-2">Registrarse</b-button>
                    <b-button @click="go('Login')" class="botones bg-success mr-2">Iniciar sesión</b-button>
                </div>
            </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
import AuthController from '@/firebase/controllers/AuthController'
import { mapMutations, mapState, mapActions } from 'vuex'
import firebase from 'firebase'
const auth = new AuthController()
export default {
  created () {
    firebase.auth().onAuthStateChanged(async user => this.SET_USER(user || null))
  },
  computed: {
    ...mapState('auth', ['user'])
  },
  methods: {
    ...mapMutations('auth', ['SET_USER']),
    ...mapActions('bitacoras', ['getBitacoras']),
    go (name) {
      this.$router.push({ name })
    },
    logOut () {
      auth.signOut()
      this.go('Login')
    }
  }
}
</script>

<style scope>
    .header{
        background: #5E60CE;
    }

    .logo{
        cursor: pointer;
    }

    .botones{
        background: #4EA8DE;
    }
</style>
