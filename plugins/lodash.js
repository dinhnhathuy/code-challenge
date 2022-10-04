import get from 'lodash/get'
import cloneDeep from 'lodash/cloneDeep'
import merge from 'lodash/merge'
import pick from 'lodash/pick'

export default (_content, inject) => {
  inject('get', get)
  inject('cloneDeep', cloneDeep)
  inject('merge', merge)
  inject('pick', pick)
}