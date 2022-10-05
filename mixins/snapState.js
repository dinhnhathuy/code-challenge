import { History } from 'stateshot'
import { mapGetters } from 'vuex'
import Vue from 'vue'

const history = new History
const snapState =  {
  data() {
    return {
      history
    }
  },

  computed: {
    ...mapGetters({
      blocks: 'app/blocks',
      targetBlock: 'app/targetBlock',
    }),
    canUndo() {
      return this.history.hasUndo
    },
    canRedo() {
      return this.history.hasRedo
    }
  },

  methods: {
    undoHandle() {
      const blocks = this.history.undo().get()
      this.setBlocksState(blocks)
    },
    redoHandle() {
      const blocks = this.history.redo().get()
      this.setBlocksState(blocks)
    },
    pushState(target = this.blocks) {
      this.history.push(target)
    },
    setBlocksState(blocks) {
      this.$store.dispatch('app/setBlocks', { data: blocks })
      this.$store.dispatch('app/setTarget', { id: this.targetBlock.id })
    }
  },

}

Vue.mixin(snapState)
// export default mixins