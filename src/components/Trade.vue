<template>
    <div>
        <b-row>
            <b-col>
                <b-form-group label="Divisa/Indice:" label-for="divisa">
                    <b-form-input type="text" placeholder="Divisa/Indice" class="input" id="divisa" required v-model="divisa"></b-form-input>
                </b-form-group>
            </b-col>
            <b-col>
                <b-form-group label="Lotaje:" label-for="lotaje">
                    <b-form-input type="text" placeholder="Lotaje" class="input" id="lotaje" required v-model="lotaje"></b-form-input>
                </b-form-group>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-form-group label="Pips:" label-for="pips">
                    <b-form-input type="text" placeholder="Pips" class="input" id="pips" required v-model="pips"></b-form-input>
                </b-form-group>
            </b-col>
            <b-col>
                <b-form-group label="Total:" label-for="total">
                    <b-form-input type="text" placeholder="Total" class="input" id="total" required v-model="total"></b-form-input>
                </b-form-group>
            </b-col>
        </b-row>
        <div class="vali">{{validacion}}</div>
    </div>
</template>

<script>
export default {
  props: { trade: { type: Object, default: () => {} }, validacion: { type: Boolean, default: false } },
  data () {
    return {
      divisa: this.trade.divisa || '',
      lotaje: this.trade.lotaje || '',
      pips: this.trade.pips || '',
      total: this.trade.total || ''
    }
  },
  updated () {
    if (this.validacion) {
      if (this.divisa !== '' && this.lotaje !== '' && this.pips !== '' && this.total !== '') {
        this.$emit('entrada', {
          divisa: this.divisa,
          lotaje: this.lotaje,
          pips: parseFloat(this.pips),
          total: parseFloat(this.total)
        })
      }
    }
  }
}
</script>

<style scoped>
    .vali{
        font-size: 1px;
        color: transparent;
    }
</style>>
