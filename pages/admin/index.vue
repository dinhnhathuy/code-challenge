<template>
  <section class="page__wrapper">
    <div class="page__header">
      <MoleculusActionsBar></MoleculusActionsBar>
    </div>
    <div class="page__body">
      <div class="page__body--left">
        <DragZone>
          <AtomsDragBlock>
            <AtomsButton text="button" :is-admin="isAdmin" />
          </AtomsDragBlock>
          <AtomsDragBlock>
            <AtomsParagraph text="Paragraph" :is-admin="isAdmin" />
          </AtomsDragBlock>
        </DragZone>
      </div>
      <div class="page__body--right">
        <TemplateAdminRight
          :items="blocks"
          :target="targetBlock"
          @change="onChange"
        ></TemplateAdminRight>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import { propsData } from '@/constant/dragBlock'
import debounce from 'lodash/debounce'
import DragZone from '~/components/moleculus/DragZone.vue'
import DropZone from '~/components/moleculus/DropZone.vue'
export default {
  components: {
    DragZone,
    DropZone,
  },
  data() {
    return {
      isAdmin: true,
      propsData
    }
  },
  computed: {
    ...mapGetters({
      blocks: 'app/blocks',
      targetBlock: 'app/targetBlock',
    }),

    getPropsData() {
      return this.$get(this.targetBlock, 'propsData', {})
    },
  },
  watch: {
    targetBlock: {
      deep: true,
      handler(newValue) {
        const props = this.$get(newValue, 'propsData', {})
        const message = this.$get(this.bindData, 'propsData.' + [propsData.MESSAGE], null)
        const text = this.$get(this.bindData, 'propsData.' + [propsData.TEXT], null)
        if(message) {
          this.bindData.propsData[propsData.MESSAGE] = props[propsData.MESSAGE]
        }
        if (text) {
          this.bindData.propsData[propsData.TEXT] = props[propsData.TEXT]
        }
      },
    },
  },
  mounted() {
    this.$store.dispatch('app/getBlocks')
  },
  methods: {
    onChange(input, target, field) {
      this.$store.dispatch('app/onChangeData', {
        id: target.id,
        input,
        field
      })
      debounce(function() {
        this.pushState()
      }, 1500)
    },
  }
}
</script>

<style>
.page__wrapper {
  display: flex;
  flex-direction: column;
}

.page__header {
  width: 100%;
  border-bottom: 1px solid black;
  height: 60px;
}

.page__body {
  display: flex;
}

.page__body--left {
  width: 20%;
  height: calc(100vh - 60px);
  border-right: 1px solid black;
}

.page__body--right {
  width: 80%;
  position: relative;
}
</style>
