import { getType } from "typesafe-actions"
import {
  getBlockListAsync,
  getMetaDataAsync,
  setMetaDataAsync,
  mergeMetaData,
  changeBlockStop,
  changeBlockStart,
  getBlockAsync,
  updateUseLink,
  updateMetaDataParam
} from "./actions"
import { mergeMetas } from "./utils"
import { set } from "monolite"

import type { BlockState } from "./types"
import type { BlockActionTypes } from "./actions"

const initialState: BlockState = {
  isInit: false,
  changeBlock: false,
  metadata: null,
  isLoading: {
    list: false,
    block: false
  },
  block: null,
  list: []
}

const reducer = (state = initialState, action: BlockActionTypes): BlockState => {
  console.log(state, action)
  switch (action.type) {
    case getType(getMetaDataAsync.success):
    case getType(setMetaDataAsync.success):
      return set(set(state, _ => _.isInit, true), _ => _.metadata, action.payload)
    case getType(mergeMetaData):
      const metadata = state.metadata ? mergeMetas(state.metadata, action.payload) : action.payload
      return set(set(state, _ => _.isInit, true), _ => _.metadata, metadata)
    case getType(updateMetaDataParam):
      const { key, value } = action.payload
      return set(state, _ => _.metadata?.parameters![key], value)
    case getType(getBlockListAsync.request):
      return set(state, _ => _.isLoading.list, true)
    case getType(getBlockListAsync.success):
      return set(set(state, _ => _.isLoading.list, true), _ => _.list, action.payload)
    case getType(getBlockListAsync.failure):
      return set(state, _ => _.isLoading.list, false)
    case getType(getBlockAsync.request):
      return set(state, _ => _.isLoading.block, true)
    case getType(getBlockAsync.success):
      return set(set(state, _ => _.isLoading.block, false), _ => _.block, action.payload)
    case getType(changeBlockStart):
      return set(state, _ => _.changeBlock, true)
    case getType(changeBlockStop):
      return set(state, _ => _.changeBlock, false)
    case getType(updateUseLink):
      return set(state, _ => _.metadata?.useLink, action.payload)
    default:
      return state
  }
}

export default reducer
