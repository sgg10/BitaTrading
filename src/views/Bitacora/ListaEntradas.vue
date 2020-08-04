<template>
    <div class="mt-5">
        <b-table hover bordered selectable select-mode="single" responsive @row-selected="detalles" :busy="isLoading" :fields="fields" :items="entradas">
            <template v-slot:cell(total) = total>
                {{total.item.total | dollar}}
            </template>
            <template v-slot:cell(pips) = pips>
                {{pips.item.pips.toFixed(2)}}
            </template>
        </b-table>
    </div>
</template>

<script>
import { dollarFilter, percentFilter } from '@/filters/numbers'

export default {
  props: {
    entradas: {
      type: Array,
      default: () => []
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  filters: { dollar: dollarFilter, percent: percentFilter },
  data () {
    return {
      fields: [
        { key: 'fecha', label: 'Fecha', sortable: true },
        { key: 'divisa', label: 'Simbolo' },
        // { key: 'lotaje', label: 'Lotaje' },
        { key: 'pips', label: 'Pips' },
        { key: 'total', label: 'Total', sortable: true }
      ]
    }
  },
  methods: {
    detalles (item) {
      const seleccionado = item.length > 0 ? item[0] : null
      if (seleccionado) {
        this.$router.push({ name: 'Entrada', params: { id: seleccionado.id } })
      }
    }
  }
}
</script>
