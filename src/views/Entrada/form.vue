<template>
  <div>
      <b-form>
        <b-row>
          <b-col>
            <b-button @click="$router.push({path:`/bitacora/${ID}`})" class="goBack"><b-icon-arrow-left-circle-fill></b-icon-arrow-left-circle-fill> Volver</b-button>
          </b-col>
        </b-row>
        <b-row class="mt-3">
          <b-col><h2>{{fecha}}</h2></b-col>
        </b-row>
        <b-row class=" my-3">
          <b-col>
            <div v-for="(item, index) in trades" :key="index">
              <Trade :trade="item" :validacion="false"/>
              <hr>
            </div>
            <b-row>
              <b-col>
                <b-button @click="borrar" class="bg-danger ml-2"><b-icon-trash></b-icon-trash> Eliminar entrada</b-button>
              </b-col>
            </b-row>
          </b-col>
          <b-col>
            <b-row>
              <b-col>
                <b-form-group label="Notas:" label-for="notas">
                  <vue-editor class="editor" v-model="notas"></vue-editor>
                </b-form-group>
              </b-col>
            </b-row>
            <div v-if="fotos != []">
              <b-row>
                <b-col>
                  <h2>Fotos:</h2>
                </b-col>
              </b-row>
              <b-row>
                <b-col v-for="(item, index) in fotos" :key="index" cols="12" md="auto">
                  <img @click="show" :src="item" width="100" height="100" class=" foto mr-2 mb-2">
                </b-col>
                <b-modal id="modal_foto" size="lg" centered hide-footer hide-header>
                  <b-carousel controls >
                    <b-carousel-slide v-for="(item, index) in fotos" :key="index">
                      <template v-slot:img>
                        <img :src="item" class="d-block img-fluid w-100">
                      </template>
                    </b-carousel-slide>
                  </b-carousel>
                </b-modal>
              </b-row>
            </div>
          </b-col>
        </b-row>
      </b-form>
  </div>
</template>

<script>
import DBController from '@/firebase/controllers/DBController'
import Trade from '@/components/Trade'
import { VueEditor } from 'vue2-editor'
import { showToast } from '@/utils/showToast'
import { mapGetters } from 'vuex'

const DB = new DBController()

export default {
  components: { Trade, VueEditor },
  props: { trade: { type: Object, default: () => {} } },
  data () {
    return {
      validacion: false,
      trades: [],
      nFotos: 0,
      fotos: [],
      notas: '',
      fecha: '',
      ID: ''
    }
  },
  methods: {
    show () {
      this.$bvModal.show('modal_foto')
    },
    async borrar () {
      try {
        await DB.delete('Entradas', this.$route.params.id)
        showToast(this.$bvToast, 'Tarea finalizada', 'Se ha eliminado correctamente esta entrada', 'success')
        setTimeout(() => this.$router.push({ path: `/bitacora/${this.ID}` }), 1000)
      } catch (error) {
        showToast(this.$bvToast, 'Error al eliminar la entrada', error.message, 'danger')
      }
    }
  },
  computed: {
    ...mapGetters('bitacoras', ['bitacora'])
  },
  async created () {
    try {
      // const result = await DB.get('Entradas').doc(this.$route.params.id).get()
      const datos = this.bitacora[1].find(e => e.id === this.$route.params.id)
      // const datos = result.exists ? result.data() : null
      this.fecha = datos.fecha
      this.notas = datos.notas
      this.trades = datos.trades
      this.fotos = datos.imagenes
      this.ID = datos.bitacoraID
    } catch (error) {
      showToast(this.$bvToast, 'Error al cargar la entrada', error.message, 'danger')
    }
  }
}
</script>

<style scoped>
  .foto{
    cursor: pointer;
  }
  .editor{
    background: white;
  }
</style>
