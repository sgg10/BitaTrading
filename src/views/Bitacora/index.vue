<template>
  <div>
    <div v-if="isLoading">
      <Loading/>
    </div>
    <div v-else>
      <b-container class="py-3 text-left">
        <b-row>
          <b-col>
            <b-button @click="$router.push({path:`/`})" class="goBack"><b-icon-arrow-left-circle-fill></b-icon-arrow-left-circle-fill> Volver</b-button>
          </b-col>
        </b-row>
        <b-row class="mt-3">
          <b-col>
            <Encabezado :bitacora="bitacora[0]"/>
          </b-col>
        </b-row>
        <b-row class="mt-5 mb-4">
          <b-col>
            <GraficaBalance :datos="estadistica"/>
          </b-col>
        </b-row>
        <b-row class="mt-3">
          <b-col>
            <ButtonCreate :values="values" :button="{ height: 60, width: 60 }" :icon="{ percent: true, width: 100, height: 50 }" />
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <ListaEntradas :entradas="this.bitacora[0].listaEntradas" />
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
import Loading from '@/components/Loading'
import Encabezado from './Encabezado'
import GraficaBalance from './GraficaBalance'
import ListaEntradas from './ListaEntradas'
import ButtonCreate from '@/components/ButtonCreate'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import DBController from '../../firebase/controllers/DBController'
import setError from '@/mixins/setError'
const db = new DBController()

export default {
  components: {
    Loading,
    Encabezado,
    GraficaBalance,
    ButtonCreate,
    ListaEntradas
  },
  mixins: [setError],
  data () {
    return {
      actual: 0,
      estadistica: [],
      values: {
        msg: 'Crear entrada',
        route: 'NewEntrada',
        params: { id: this.$route.params.id },
        formButton: true
      }
    }
  },
  computed: {
    ...mapGetters('bitacoras', ['bitacora', 'bitacoras']),
    ...mapGetters('loading', ['isLoading'])
  },
  methods: {
    ...mapActions('bitacoras', ['getBitacora', 'getBitacoras']),
    ...mapMutations('loading', ['SET_LOADING']),
    entradas () {
      this.$router.push({ name: 'NewEntrada', params: { id: this.$route.params.id } })
    },
    variacion () {
      return parseFloat(((this.actual - this.bitacora[0].valorInicial) * 100) / this.bitacora[0].valorInicial).toFixed(2)
    },
    actualizarBitacora (valorActual, variacion) {
      db.update('Bitacoras', this.$route.params.id, { valorActual, variacion })
    },
    generarEstadisticas () {
      this.actual = parseFloat(this.bitacora[0].valorInicial)
      const inicial = [this.bitacora[0].fecha, this.actual]
      const entradas = this.bitacora[0].listaEntradas.reverse().map(e => {
        this.actual += parseFloat(e.total)
        return [e.fecha, this.actual]
      })
      this.estadistica.push(inicial)
      entradas.forEach(e => this.estadistica.push(e))
      this.bitacora[0].valorActual = this.actual
      this.bitacora[0].variacion = this.variacion()
      this.actualizarBitacora(this.bitacora[0].valorActual, this.bitacora[0].variacion)
    }
  },
  async created () {
    try {
      this.SET_LOADING(true)
      if (!this.bitacoras.length) {
        await this.getBitacoras()
      }
      await this.getBitacora(this.$route.params.id)
      if (!this.bitacora[0]) {
        this.generarEstadisticas()
      }
      this.SET_LOADING(false)
    } catch (error) {
      const errObj = {
        routeParams: this.$route.params,
        message: error.message
      }
      if (error.response) {
        errObj.data = error.response.data
        errObj.status = error.response.status
      }
      this.setApiErr(errObj)
      this.$router.push({ name: 'Error' })
    }
  }
}
</script>
