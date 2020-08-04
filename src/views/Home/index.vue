<template>
  <div class="container">
    <Loading class="my-5" v-if="isLoading"/>
    <div v-else>
      <ButtonCreate v-if="bitacoras.length == 0" class="mt-5 pt-5" :values="values" :button="button" :icon="icon"/>
      <div v-else>
        <b-container>
          <b-row>
            <b-col>
              <div class="mt-3">
                <ButtonCreate class="mt-5 pt-5" :values="{...values, msg: 'Crear bitacora'}" :button="button" :icon="icon"/>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <Lista :bitacoras="bitacoras" :isLoading="isLoading" />
            </b-col>
          </b-row>
        </b-container>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonCreate from '@/components/ButtonCreate'
import Loading from '@/components/Loading'
import Lista from './Lista'
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'Home',
  components: { ButtonCreate, Loading, Lista },
  data () {
    return {
      values: {
        msg: 'Crea tu primera bitacora',
        route: 'NewBitacora'
      },
      button: {
        width: 100,
        height: 100
      },
      icon: {
        width: 75,
        height: 70
      }
    }
  },
  methods: {
    ...mapMutations('loading', ['SET_LOADING']),
    ...mapActions('bitacoras', ['getBitacoras'])
  },
  computed: {
    ...mapGetters('bitacoras', ['bitacoras']),
    ...mapGetters('loading', ['isLoading'])
  },
  async created () {
    this.SET_LOADING(true)
    await this.getBitacoras()
    this.SET_LOADING(false)
  }
}
</script>
