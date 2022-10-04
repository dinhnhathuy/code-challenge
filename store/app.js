import { isString } from '@/utils/types'
import pick from 'lodash/pick'
import { blockData, propsData, mapData } from '@/constant/dragBlock'

export const state = () => ({
  listBlocks: [],
  targetBlock: {},
})

export const mutations = {
  ADD_BLOCK(state, data) {
    state.listBlocks.push(data)
  },
  SET_TARGET(state, data) {
    state.targetBlock = this.$cloneDeep(data)
  },
  CHANGE_TARGET_DATA(state, { id, input, field }) {
    const block = state.listBlocks.find(x => x.id === id)
    const target = state.targetBlock
    block.propsData[field] = input
    target.propsData[field] = input
  },
}

export const actions = {
  addBlock({ commit }, payload) {
    const transformPayload = isString(payload) ? JSON.parse(payload) : payload
    const commitData = {
      [blockData.COMPONENT]: transformPayload[mapData[blockData.COMPONENT]],
      [blockData.PROPSDATA]: transformPayload[mapData[blockData.PROPSDATA]],
      [blockData.ID]: transformPayload[mapData[blockData.ID]],
    }
    commit('ADD_BLOCK', commitData)
  },
  setTarget({ commit, state }, payload) {
    const id = payload.id || 0
    const targetBlock = state.listBlocks.find((x) => x.id === id)
    console.log('setTarget', targetBlock);
    commit('SET_TARGET', targetBlock)
  },
  onChangeData({ commit }, payload) {
    const id = payload.id || 0
    const input = payload.input || ''
    const field = payload.field || 'text'
    commit('CHANGE_TARGET_DATA', { id, input, field })
  }
}

export const getters = {
  blocks: (state) => state.listBlocks,
  targetBlock: (state) => {
    console.log('state.targetBlock', state.targetBlock)
    if(state.targetBlock[blockData.ID]) return {
      [blockData.COMPONENT]: state.targetBlock[blockData.COMPONENT],
      [blockData.ID]: state.targetBlock[blockData.ID],
      [blockData.PROPSDATA]: {
        ...pick(state.targetBlock[blockData.PROPSDATA], Object.values(propsData))
      },
    }
    return {}
  },
}
