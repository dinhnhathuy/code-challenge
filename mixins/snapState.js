import { History } from 'stateshot'
import Vue from 'vue'
import values from 'lodash/values'

const snapState =  {
  data() {
    return {
      history: new History()
    }
  },

  computed: {
    canUndo() {
      return this.history.hasUndo
    },
    canRedo() {
      return this.history.hasRedo
    }
  },

  methods: {
    undoHandle() {
      this.history.undo().get()
      this.setBlocksState()
    },
    redoHandle() {
      this.history.redo().get()
      this.setBlocksState()
    },
    pushState(target) {
      this.history.pushSync(target)
    },
    setBlocksState() {
      const listChunks = this.history.$chunks
      const index = this.history.$index
      const allRecords = values(listChunks)
      const listRecords = allRecords.slice(0, index + 1)
      this.$store.dispatch('app/setBlocks', { data: listRecords })
    }
  },

}

Vue.mixin(snapState)
// export default mixins