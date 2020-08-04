<template>
  <div>
    <b-form @submit.prevent="create">
      <b-row>
        <b-col>
          <b-button @click="$router.push({path:`/bitacora/${$route.params.id}`})" class="goBack"><b-icon-arrow-left-circle-fill></b-icon-arrow-left-circle-fill> Volver</b-button>
        </b-col>
      </b-row>
      <b-row class="mt-3">
        <b-col><h2>Nueva entrada</h2></b-col>
      </b-row>
      <b-row class=" my-3">
        <b-col>
          <b-button @click="nTrades++" class="bg-success mr-2"><b-icon-plus-circle class="iconoTrade"></b-icon-plus-circle> Añadir Trade</b-button>
          <b-button @click="nTrades--" class="bg-danger"><b-icon-plus-circle class="iconoTrade"></b-icon-plus-circle> Eliminar Trade</b-button>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <div v-for="(index) in nTrades" :key="index">
            <Trade :trade="{}" :validacion="validacion" @entrada="trades[index-1]=$event"/>
            <hr>
          </div>
        </b-col>
        <b-col>
          <b-row>
            <b-col>
              <b-form-group label="Notas:" label-for="notas">
                <vue-editor class="editor" v-model="notas"></vue-editor>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-button @click="nFotos++" class="bg-success mb-3"><b-icon-plus-circle></b-icon-plus-circle> Agregar Foto</b-button>
            </b-col>
          </b-row>
          <b-row class="mb-2" v-for="(index) in nFotos" :key="index">
            <b-col cols="8">
              <b-form-file v-model="fotos[index-1]" :state="Boolean(fotos[index-1])" placeholder="Foto"
              drop-placeholder="Foto"></b-form-file>
            </b-col>
            <b-col>
              <b-button class="bg-danger" @click="fotos.splice(index-1, 1);nFotos--"><b-icon-trash></b-icon-trash> Eliminar</b-button>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-button type="submit" class="roundedButton"><b-icon-plus-circle class="icono"></b-icon-plus-circle></b-button> Crear entrada
        </b-col>
      </b-row>
    </b-form>
  </div>
</template>

<script>
import DBController from '@/firebase/controllers/DBController'
import StorageController from '@/firebase/controllers/StorageController'
import { showToast } from '@/utils/showToast'
import Trade from '@/components/Trade'
import { VueEditor } from 'vue2-editor'
import { mapGetters } from 'vuex'

const DB = new DBController()
const storage = new StorageController()

export default {
  components: { Trade, VueEditor },
  props: { trade: { type: Object, default: () => {} } },
  data () {
    return {
      validacion: false,
      nTrades: 0,
      trades: [],
      nFotos: 0,
      fotos: [],
      notas: ''
    }
  },
  computed: {
    ...mapGetters('auth', ['user'])
  },
  methods: {
    async create () {
      try {
        this.validacion = true
        const urls = await this.subirFoto(this.fotos)
        await DB.crearEntrada(this.trades, this.notas, urls, this.$route.params.id)
        showToast(this.$bvToast, 'Tarea finalizada', 'Se ha creado la entrada a tu bitacora', 'success')
        this.validacion = false
        setTimeout(() => {
          this.$router.push({ name: 'Bitacora', params: { id: this.$route.params.id } })
        }, 1500)
      } catch (error) {
        showToast(this.$bvToast, 'Tarea abortada', error, 'danger')
      }
    },
    async subirFoto (listaFotos) {
      const urls = []
      if (listaFotos.length > 0) {
        try {
          for (let i = 0; i < listaFotos.length; i++) {
            const link = await storage.uploadImage(listaFotos[i], `${this.user.uid}/${this.$route.params.id}`)
            urls.push(link)
          }
        } catch (error) {
          console.log(error)
        }
      }
      return urls
    }
  }
}
</script>

<style lang="scss" scoped>
  .editor{
      background: white;
  }
</style>
