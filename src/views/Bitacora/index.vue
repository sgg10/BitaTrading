<template>
  <div>
    <div v-if="isLoading">
      <Loading/>
    </div>
  </div>
</template>

<script>
import Loading from '@/components/Loading'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: { Loading },
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
