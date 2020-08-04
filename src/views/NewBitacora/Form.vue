<template>
  <div>
    <b-form @submit.prevent="create">
      <b-row>
        <b-col>
            <b-button @click="$router.push({path:`/`})" class="goBack"><b-icon-arrow-left-circle-fill></b-icon-arrow-left-circle-fill> Volver</b-button>
        </b-col>
      </b-row>
      <b-row class="mt-3">
        <b-col><h2>Nueva Bitacora</h2></b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-form-group label="Nombre:" label-for="txtNom">
            <b-form-input type="text" placeholder="Nombre de la bitacora" class="input" id="txtNom" required v-model="name"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group label="Valor inicial:" label-for="txtValInit">
            <b-form-input type="number" placeholder="Valor inicial de la cuneta" class="input" id="txtValInit" required v-model="val"></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-button type="submit" class="roundedButton"><b-icon-plus-circle class="icono"></b-icon-plus-circle></b-button>Crear bitacora
        </b-col>
      </b-row>
  </b-form>
  </div>
</template>

<script>
import DBController from '../../firebase/controllers/DBController'
import { showToast } from '@/utils/showToast'
import { mapGetters } from 'vuex'
const db = new DBController()

export default {
  data () {
    return {
      name: '',
      val: ''
    }
  },
  computed: {
    ...mapGetters('auth', ['user'])
  },
  methods: {
    async create () {
      try {
        const { uid } = this.user
        await db.crearBitacora(this.name, this.val, uid)
        showToast(this.$bvToast, 'Tarea finalizada', 'Se ha creado tu nueva bitacora', 'success')
        this.name = ''
        this.val = ''
        setTimeout(() => this.$router.push({ name: 'Home' }), 1000)
      } catch (error) {
        showToast(this.$bvToast, 'Tarea abortada', error, 'danger')
      }
    }
  }
}
</script>

<style scoped>
  .roundedButton{
    border-radius: 100%;
    height: 60px;
    width: 60px;
    background: #5E60CE;
  }
  .roundedButton:hover{
    background: #494aa0;
  }

  .icono{
    width: 100%;
    height: 50px;
  }

  .goBack{
    background: #5E60CE;
  }
  .goBack:hover{
    background: #494aa0;
  }
</style>
