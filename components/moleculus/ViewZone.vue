<template>
  <div class="zone__wrapper">
    <div v-for="(block, index) in blocks">
      <component
        :key="index"
        :is="block.component"
        v-bind="block.propsData"
        :is-admin="false"
      ></component>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      blocks: 'app/blocks',
    }),
  },
}
</script>

<style>
.zone__wrapper {
  width: 100%;
  height: 100%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
