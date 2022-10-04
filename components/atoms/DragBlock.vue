<template>
  <div class="block__wrapper" :draggable="draggable" @dragstart="dragStart" @dragover.stop>
    <div class="block__visual">
    </div>
    <slot></slot>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    draggable: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: ''
    },
  },
  methods: {
    dragStart(e) {
      const defaultSlot = this.$slots.default;
      const slotComponent = defaultSlot[0]
      // console.log('defaultSlot', defaultSlot[0])
      const componentOptions = JSON.stringify(this.$cloneDeep(this.$get(slotComponent, 'componentOptions', {})))
      e.dataTransfer.setData('component', componentOptions)
    },
    getComponentName (options) {
      const name = options.name || options._componentTag
      if (name) {
        return name
      }
      const file = options.__file
      if (file) {
        return classify(basename(file, '.vue'))
      }
    }
  }
}
</script>

<style scoped>
.block__visual {
  height: 80px;
  width: 80px;
  border-radius: 1px;
  border: 2px solid gray;
  margin: 1rem auto;
}

.block__wrapper {
  text-align: center;
}
</style>