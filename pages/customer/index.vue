<template>
  <MoleculusViewZone>

  </MoleculusViewZone>
</template>

<script>
  export default {
    mounted() {
      this.$store.dispatch('app/getBlocks')
    },
  }
</script>