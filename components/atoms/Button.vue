<template>
  <button @click="handleClick">
    {{ text }}
  </button>
</template>

<script>
  export default {
    name: 'ElementButton',
    props: {
      text: {
        type: String,
        default: 'title'
      },

      message: {
        type: String,
        default: ''
      },

      isAdmin: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      handleClick() {
        if(!this.isAdmin) window.alert(this.message)
      }
    }
  }
</script>
