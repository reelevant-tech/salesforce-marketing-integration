import * as immutable from "object-path-immutable"
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
  switch (action.type) {
    case getType(getMetaDataAsync.success):
    case getType(setMetaDataAsync.success):
      return immutable.wrap(state).set(["isInit"], true).set(["metadata"], action.payload).value()
    case getType(mergeMetaData):
      const metadata = state.metadata ? mergeMetas(state.metadata, action.payload) : action.payload
      return immutable.wrap(state).set(["isInit"], true).set(["metadata"], metadata).value()
    case getType(updateMetaDataParam):
      const { key, value } = action.payload
      return immutable.set(state, ["metadata", "parameters", key], value)
    case getType(getBlockListAsync.request):
      return immutable.set(state, ["isLoading", "list"], true)
    case getType(getBlockListAsync.success):
      return immutable.wrap(state).set(["isLoading", "list"], false).set(["list"], action.payload).value()
    case getType(getBlockListAsync.failure):
      return immutable.set(state, ["isLoading", "list"], false)
    case getType(getBlockAsync.request):
      return immutable.set(state, ["isLoading", "block"], true)
    case getType(getBlockAsync.success):
      return immutable.wrap(state).set(["isLoading", "block"], false).set(["block"], action.payload).value()
    case getType(changeBlockStart):
      return immutable.set(state, ["changeBlock"], true)
    case getType(changeBlockStop):
      return immutable.set(state, ["changeBlock"], false)
    case getType(updateUseLink):
      return immutable.set(state, ["metadata", "useLink"], action.payload)
    default:
      return state
  }
}

export default reducer
