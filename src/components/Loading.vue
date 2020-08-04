<template>
  <div>
    <b-container class="text-center">
      <div class="spinner-wrapper w-100">
        <b-row>
          <b-col cols="5"></b-col>
          <b-col>
            <bounce-loader
              :loading="true"
              :color="'#5966E8'"
              :size="size"
              class="my-1"
            />
          </b-col>
          <b-col cols="4"></b-col>
        </b-row>
      </div>
      <h1 class="my-5">Cargando...</h1>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'Loading',
  props: {
    size: {
      require: false,
      type: Number,
      default: 150,
      validator: (value) => value >= 50 && value <= 250
    }
  }
}
</script>
