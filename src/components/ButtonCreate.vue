<template>
    <div :class="values.formButton ? '': 'mt-5 pt-5'">
        <b-row>
            <b-col>
                <b-button
                @click="$router.push({name: values.route, params: values.params})"
                class="roundedButton"
                :style="`width: ${button.width}px; height: ${button.height}px;`"
                >
                  <b-icon-plus-circle
                  :style="`width: ${icon.width}${icon.percent ? '%' : 'px'}; height: ${icon.height}px;`"
                  >
                  </b-icon-plus-circle>
                </b-button>
                {{ values.formButton ? values.msg : '' }}
            </b-col>
        </b-row>
        <b-row v-if="!values.formButton">
            <b-col>
                <h2>{{ values.msg || '' }}</h2>
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
