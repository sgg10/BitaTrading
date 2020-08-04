<template>
  <div class="mt-5">
    <b-table hover selectable select-mode="single" responsive @row-selected="detalles" :busy="busy" :fields="fields" :items="bitacoras">
      <template v-slot:cell(valorInicial) = valorInicial>
        {{valorInicial.item.valorInicial | dollar}}
      </template>
      <template v-slot:cell(valorActual) = valorActual>
        <div :class="(valorActual.item.valorActual).toString().includes('-') ? 'text-danger' : 'text-success'">{{valorActual.item.valorActual | dollar}}</div>
      </template>
      <template v-slot:cell(variacion) = variacion>
        <div :class="(variacion.item.variacion).toString().includes('-') ? 'text-danger':'text-success'" >{{variacion.item.variacion | percent}}</div>
      </template>
      <template v-slot:cell(acciones) = bitacora>
        <b-button variant="danger" @click="eliminar(bitacora.item)">
          <b-icon-trash-fill></b-icon-trash-fill>Eliminar
        </b-button>
      </template>
      <template v-slot:table-busy>
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Loading...</strong>
        </div>
      </template>
    </b-table>
  </div>
</template>

<script>
import { dollarFilter, percentFilter } from '@/filters/numbers'
import DBController from '../../firebase/controllers/DBController'
import { mapActions } from 'vuex'
const db = new DBController()

export default {
  props: {
    bitacoras: {
      type: Array,
      required: true
    },
    isLoading: {
      type: Boolean,
      required: true
    }
  },
  filters: { dollar: dollarFilter, percent: percentFilter },
  data () {
    return {
      busy: this.isLoading,
      fields: [
        { key: 'name', label: 'Nombre', sortable: true },
        { key: 'valorInicial', label: 'Valor inicial', sortable: true },
        { key: 'valorActual', label: 'Valor actual', sortable: true },
        { key: 'variacion', label: 'Variacion', sortable: true },
        { key: 'acciones', label: 'Acciones' }
      ]
    }
  },
  methods: {
    ...mapActions('bitacoras', ['getBitacoras']),
    detalles (item) {
      const seleccionado = item.length > 0 ? item[0] : null
      if (seleccionado) {
        this.$router.push({ name: 'Bitacora', params: { id: seleccionado.id } })
      }
    },
    async eliminar (item) {
      this.busy = true
      await db.delete('Bitacoras', item.id)
      await this.getBitacoras()
      this.busy = false
    }
  }
}
</script>
