<template>
  <div>
    <line-chart
      :colors="['#5966E8']"
      :data="datos"
    />
  </div>
</template>

<script>
export default {
  props: ['datos']
}
</script>
