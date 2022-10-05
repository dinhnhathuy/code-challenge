<template>
  <div @dragover.prevent @drop.prevent="dragHandle">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    props: {
      id: {
        type: String,
      }
    },
  }
</script>

