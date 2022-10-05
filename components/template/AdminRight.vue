<template>
  <div class="area__wrapper">
    <div
      class="area__top"
      style="height: 85%; width: 100%; border-bottom: 1px solid black"
    >
      <MoleculusDropZone>
        <template #default="{ click }">
          <div style="display: flex; flex-direction: row">
            <div class="area__left">
              <p @click="click">Mouse:({{ x }}, {{ y }})</p>
              <p>Dragging:</p>
              <p>instances: {{ items.length }}</p>
              <p>config: {{ JSON.stringify(target) }}</p>
            </div>
            <div class="area__right">
              <div v-for="(block, index) in items" @click="click(block)">
                <component
                  :key="index"
                  :is="block.component"
                  :is-admin="true"
                  v-bind="block.propsData"
                ></component>
              </div>
            </div>
          </div>
        </template>
      </MoleculusDropZone>
    </div>
    <div
      v-if="propsTarget"
      class="area__bottom"
      style="display: flex; flex-direction: column; margin: 1rem; gap: 1rem"
    >
      <div v-for="(item, index) in Object.keys(propsTarget)">
        {{ item }}
        <input
          :key="index"
          v-model="bindData[item]"
          type="text"
          @input="change($event, item)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import mouseTracking from '@/mixins/mouseTracking'
export default {
  mixins: [mouseTracking],
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    target: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      isAdmin: true,
      components: this.$cloneDeep(this.items),
      bindData: {},
    }
  },
  watch: {
    propsTarget: {
      deep: true,
      handler(newValue) {
        Object.keys(newValue).forEach((x) => {
          this.bindData[x] = newValue[x]
        })
      },
    },
  },
  computed: {
    propsTarget() {
      const props = this.$get(this.target, 'propsData', {})
      const mappingPropsData = Object.keys(props).reduce(
        (accumulator, value) => {
          return { ...accumulator, [value]: props[value] }
        },
        {}
      )
      return mappingPropsData
    },
  },
  methods: {
    change(event, field) {
      this.$emit('change', event.target.value, this.target, field)
    },
  },
}
</script>

<style>
.area__wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.area__top {
  width: 100%;
}

.area__left {
  width: 30%;
}

.area__right {
  width: 70%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
