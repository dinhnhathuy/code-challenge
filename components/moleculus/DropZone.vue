<template>
  <div @dragover.prevent @drop.prevent="dropHandle" style="width: 100%; height: 100%; ">
    <slot :customClick="targetComponent"></slot>
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
      this.$emit('handleCommitHistory', options)
    },
    createId() {
      return 'id_' + Date.now()
    },
    targetComponent(component) {
      const id = component.id
      const isAdmin = this.$get(component, 'propsData.isAdmin', false)
      this.$store.dispatch('app/setTarget', { id })
    }
  }
}
</script>

