<template>
  <div>
    <b-row>
      <b-col>
        <h2>{{bitacora.name}}</h2>
      </b-col>
    </b-row>
    <b-row class="mt-2">
      <b-col>
        <h4>Valor inicial: {{bitacora.valorInicial | dollar}}</h4>
      </b-col>
      <b-col>
        <h4>Variación: {{bitacora.variacion | percent}}</h4>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <h4>Valor Actual: {{bitacora.valorActual | dollar}}</h4>
      </b-col>
      <b-col>
        <h4>Trades: {{bitacora.cantTrades || 0}}</h4>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { dollarFilter, percentFilter } from '../../filters/numbers'

export default {
  props: {
    bitacora: {
      type: Object,
      require: true,
      default () {
        return {
          valorInicial: 0,
          variacion: 0,
          valorActual: 0,
          cantTrades: 0
        }
      }
    }
  },
  filters: { dollar: dollarFilter, percent: percentFilter }
}
</script>
