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
    // push droped component to state
    // commit history
    dropHandle(e) {
      const id = this.createId()
      const component = e.dataTransfer.getData('component')
      const options = this.$merge(JSON.parse(component), { id })
      this.$store.dispatch('app/addBlock', options)
      this.$emit('handleCommitHistory', options)
    },
    createId() {
      return 'id_' + Date.now()
    },
    // get the edditable component
    targetComponent(component) {
      const id = component.id
      this.$store.dispatch('app/setTarget', { id })
    }
  }
}
</script>

