<template>
    <div class="mt-5 pt-5">
        <b-row>
            <b-col>
                <b-button
                @click="$router.push({name: values.route})"
                class="roundedButton"
                :style="`width: ${button.width}px; height: ${button.height}px;`"
                >
                  <b-icon-plus-circle
                  :style="`width: ${icon.width}px; height: ${icon.height}px;`"
                  >
                  </b-icon-plus-circle>
                </b-button>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <h2>{{ values.msg }}</h2>
            </b-col>
        </b-row>
    </div>
</template>

<script>
export default {
  name: 'ButtonCreate',
  props: {
    values: {
      type: Object,
      required: true
    },
    button: {
      type: Object,
      required: true
    },
    icon: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
  .roundedButton{
    border-radius: 100%;
    background: #5E60CE;
  }

  .roundedButton:hover{
    background: #494aa0;
  }
</style>
