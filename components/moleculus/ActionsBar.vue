<template>
  <div class="list list__wrapper">
    <div
      v-for="(item, i) in listActions"
      :key="i"
      :class="`${item.disable ? 'list__item--disable' : ''} list__item`"
      @click="handleActions(item.action, item.disable)"
    >
      {{ item.title }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  computed: {
    listActions() {
      return [
        {
          title: 'Save',
          action: 'Save',
        },
        {
          title: 'Undo',
          action: 'Undo',
          disable: !this.canUndo,
        },
        {
          title: 'Redo',
          action: 'Redo',
          disable: !this.canRedo,
        },
        {
          title: 'Export',
          action: 'Export',
        },
        {
          title: 'Import',
          action: 'Import',
        },
        {
          title: 'View',
          action: 'View',
        },
        {
          title: 'Clear',
          action: 'Clear',
        },
      ]
    },
  },
  methods: {
    handleActions(action, disable) {
      switch (action) {
        case 'Save':
          this.ActionSave(disable)
          break;
        case 'Undo':
          this.ActionUndo(disable)
          break;
        case 'Redo':
          this.ActionRedo(disable)
          break;
        case 'View':
          this.ActionView(disable)
          break;
        case 'Clear':
          this.ActionClear(disable)
          break;

        default:
          break;
      }
    },
    ActionSave() {
      console.log('save')
      const message = this.$store.dispatch('app/saveBlocks')
      console.log(message)
    },
    ActionUndo(disable) {
      if(!disable) {
        this.undoHandle()
        console.log('undo')
      }
    },
    ActionRedo(disable) {
      if(!disable) {
        this.redoHandle()
        console.log('redo')
      }
    },
    ActionView() {
      console.log('view')
      this.$router.push({ name: 'customer' })
    },
    ActionClear() {
      console.log('clear')
      this.$store.dispatch('app/clearBlocks')
    },
  },
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
  transition: all 0.2s ease;
}

.list__item:hover {
  opacity: 0.8;
}

.list__item.list__item--disable {
  cursor: not-allowed;
  background: lightcoral !important;
}

.list__wrapper {
  display: flex;
  justify-content: center;
}
</style>
