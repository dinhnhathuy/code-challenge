<template>
  <div class="list list__wrapper">
    <div v-for="(item, i) in listActions" :key="i" class="list__item" @click="handleActions(item.action)">{{ item.title }}</div>
  </div>
</template>

<script>
const listActions = [
  {
    title: 'Save',
    action: 'save'
  },
  {
    title: 'Undo',
    action: 'undo'
  },
  {
    title: 'Redo',
    action: 'redo'
  },
  {
    title: 'Export',
    action: 'export'
  },
  {
    title: 'Import',
    action: 'import'
  },
  {
    title: 'View',
    action: 'view'
  },
  {
    title: 'Clear',
    action: 'clear'
  },
]
export default {
  data() {
    return {
      listActions
    }
  },
  methods: {
    handleActions(action) {
      this[action]()
    },
    save() {
      console.log('save')
      const message = this.$store.dispatch('app/saveBlocks')
      console.log(message)
    },
    undo() {
      console.log('undo')
    },
    redo() {
      console.log('redo')
    },
    export() {
      console.log('export')
    },
    import() {
      console.log('import')
    },
    view() {
      console.log('view')
      this.$router.push({name: 'customer'})
    },
    clear() {
      console.log('clear')
      this.$store.dispatch('app/clearBlocks')
    },
  }
}
</script>

<style>
.list {
  margin: 1rem;
}

.list__item {
  padding: 5px 10px;
  border-right: 2px solid #fff;
  background: red;
  color: #fff;
  cursor: pointer;
  transition: all .2s ease;
}

.list__item:hover {
  opacity: 0.8;
}

.list__wrapper {
  display: flex;
  justify-content: center;
}
</style>