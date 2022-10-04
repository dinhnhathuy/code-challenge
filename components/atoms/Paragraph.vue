<template>
  <p>
    {{ text }}
  </p>
</template>

<script>
  export default {
    props: {
      text: {
        type: String,
        default: ''
      },

      isAdmin: {
        type: Boolean,
        default: false
      }
    }
}
</script>

