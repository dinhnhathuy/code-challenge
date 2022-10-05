import { isString } from '@/utils/types'
import pick from 'lodash/pick'
import set from 'lodash/set'
import { blockData, propsData, mapData, componentMapProps } from '@/constant/dragBlock'

export const state = () => ({
  listBlocks: [],
  targetBlock: {},
})

export const mutations = {
  ADD_BLOCK(state, data) {
    state.listBlocks.push(data)
  },
  SET_BLOCKS(state, data) {
    state.listBlocks = data
  },
  SET_TARGET(state, data) {
    state.targetBlock = this.$cloneDeep(data)
  },
  CHANGE_TARGET_DATA(state, { id, input, field }) {
    const block = state.listBlocks.find((x) => x.id === id)
    const target = state.targetBlock
    block.propsData[field] = input
    target.propsData[field] = input
  },
}

export const actions = {
  addBlock({ commit }, payload) {
    const transformPayload = isString(payload) ? JSON.parse(payload) : payload
    const component = transformPayload[mapData[blockData.COMPONENT]]
    let props = {}
    componentMapProps[transformPayload[mapData[blockData.COMPONENT]]].map(x => {
      set(props, x, x)
    })
    const commitData = {
      [blockData.COMPONENT]: component,
      [blockData.PROPSDATA]: props,
      [blockData.ID]: transformPayload[mapData[blockData.ID]],
    }
    let test = {}
    componentMapProps[transformPayload[mapData[blockData.COMPONENT]]].map(x => {
      set(test, x, '')
    })
    console.log(test)

    commit('ADD_BLOCK', commitData)
  },
  setTarget({ commit, state }, payload) {
    const id = payload.id || 0
    const targetBlock = state.listBlocks.find((x) => x.id === id)
    console.log('setTarget', targetBlock)
    commit('SET_TARGET', targetBlock)
  },
  onChangeData({ commit }, payload) {
    const id = payload.id || 0
    const input = payload.input || ''
    const field = payload.field || 'text'
    commit('CHANGE_TARGET_DATA', { id, input, field })
  },
  saveBlocks({ commit, state }) {
    localStorage.setItem('blocks', JSON.stringify(state.listBlocks));
    return 'save successful'
  },
  getBlocks({ commit, state }) {
    if(localStorage && localStorage.getItem('blocks')) {
      const blocks = localStorage.getItem('blocks')
      commit('SET_BLOCKS', JSON.parse(blocks))
      return 'get successful'
    }
  },
  clearBlocks({ commit }) {
    if(localStorage && localStorage.getItem('blocks')) {
      localStorage.setItem('blocks', JSON.stringify([]));
      commit('SET_BLOCKS', [])
      commit('SET_TARGET', {})
    }
  }
}

export const getters = {
  blocks: (state) => state.listBlocks,
  targetBlock: (state) => {
    if (state.targetBlock[blockData.ID]) {
      const target = {
        [blockData.COMPONENT]: state.targetBlock[blockData.COMPONENT],
        [blockData.ID]: state.targetBlock[blockData.ID],
        [blockData.PROPSDATA]: {
          ...pick(
            state.targetBlock[blockData.PROPSDATA],
            Object.values(propsData)
          ),
        },
      }
      console.log('state.targetBlock', target)
      return target
    }
    return {}
  },
}
