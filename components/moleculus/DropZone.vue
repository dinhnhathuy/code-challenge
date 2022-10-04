<template>
  <div @dragover.prevent @drop.prevent="dropHandle" style="width: 100%; height: 100%; ">
    <slot :click="targetComponent"></slot>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      // required: true
    }
  },
  methods: {
    dropHandle(e) {
      const id = this.createId()
      const component = e.dataTransfer.getData('component')
      // console.log('dropZone', id, component)
      const options = this.$merge(JSON.parse(component), { id })
      this.$store.dispatch('app/addBlock', options)
    },
    createId() {
      return 'id_' + Date.now()
    },
    targetComponent(component) {
      const id = component.id
      const isAdmin = component.propsData.isAdmin
      isAdmin && this.$store.dispatch('app/setTarget', { id })
    }
  }
}
</script>

