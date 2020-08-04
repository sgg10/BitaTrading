<template>
  <div>
    <div v-if="isLoading">
      <Loading/>
    </div>
    <div v-else>
      <b-container fluid class="px-5 py-3 text-left">
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
        <b-row class="mt-5">
          <b-col>
            <GraficaBalance :datos="estadistica"/>
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
import { mapActions, mapGetters } from 'vuex'

export default {
  components: { Loading, Encabezado, GraficaBalance },
  data () {
    return {
      isLoading: false
    }
  },
  computed: {
    ...mapGetters('bitacoras', ['bitacora'])
  },
  methods: {
    ...mapActions('bitacoras', ['getBitacora'])
  },
  async created () {
    this.isLoading = true
    await this.getBitacora(this.$route.params.id)
    this.isLoading = false
  }
}
</script>
