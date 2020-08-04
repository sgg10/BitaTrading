<template>
  <div class="mt-5">
    <b-table hover selectable select-mode="single" responsive @row-selected="detalles" :busy="isLoading" :fields="fields" :items="bitacoras">
      <template v-slot:cell(valorInicial) = valorInicial>
        {{valorInicial.item.valorInicial | dollar}}
      </template>
      <template v-slot:cell(valorActual) = valorActual>
        <div :class="(valorActual.item.valorActual).toString().includes('-') ? 'text-danger' : 'text-success'">{{valorActual.item.valorActual | dollar}}</div>
      </template>
      <template v-slot:cell(variacion) = variacion @click="h(variacion.item.variacion)" >
        <div :class="(variacion.item.variacion).toString().includes('-') ? 'text-danger':'text-success'" >{{variacion.item.variacion | percent}}</div>
      </template>
    </b-table>
  </div>
</template>

<script>
import { dollarFilter, percentFilter } from '@/filters/numbers'
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
      fields: [
        { key: 'name', label: 'Nombre', sortable: true },
        { key: 'valorInicial', label: 'Valor inicial', sortable: true },
        { key: 'valorActual', label: 'Valor actual', sortable: true },
        { key: 'variacion', label: 'Variacion', sortable: true }
      ]
    }
  },
  methods: {
    detalles (item) {
      const seleccionado = item.length > 0 ? item[0] : null
      if (seleccionado) {
        this.$router.push({ name: 'Bitacora', params: { id: seleccionado.id } })
      }
    }
  }
}
</script>
