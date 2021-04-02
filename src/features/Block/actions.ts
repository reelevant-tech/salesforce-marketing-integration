import { createAsyncAction, createAction, ActionType } from "typesafe-actions"
import { BlockListFilter, MetaData, BlockWithGroup } from "./types"

export const getBlockListAsync = createAsyncAction("BLOCK_LIST_REQUEST", "BLOCK_LIST_SUCCESS", "BLOCK_LIST_FAILURE")<
  BlockListFilter,
  BlockWithGroup[],
  Error
>()

export const getBlockAsync = createAsyncAction("BLOCK_REQUEST", "BLOCK_SUCCESS", "BLOCK_FAILURE")<
  string,
  BlockWithGroup,
  Error
>()

export const getMetaDataAsync = createAsyncAction(
  "GET_METADATA_REQUEST",
  "GET_METADATA_SUCCESS",
  "GET_METADATA_FAILURE"
)<undefined, MetaData, Error>()

export const setMetaDataAsync = createAsyncAction(
  "SET_METADATA_REQUEST",
  "SET_METADATA_SUCCESS",
  "SET_METADATA_FAILURE"
)<MetaData, MetaData, Error>()

export const setContentAsync = createAsyncAction("SET_CONTENT_REQUEST", "SET_CONTENT_SUCCESS", "SET_CONTENT_FAILURE")<
  string,
  string,
  Error
>()

export const mergeMetaData = createAction("MERGE_METADATA")<MetaData>()

export const updateMetaDataParam = createAction("UPDATE_METADATA_PARAM")<{ key: string; value: string }>()

export const updateUseLink = createAction("UPDATE_USE_LINK")<boolean>()

export const changeBlockStart = createAction("CHANGE_BLOCK_START")()
export const changeBlockStop = createAction("CHANGE_BLOCK_STOP")()

export type BlockActionTypes = ActionType<
  | typeof getBlockListAsync
  | typeof getMetaDataAsync
  | typeof setMetaDataAsync
  | typeof mergeMetaData
  | typeof getBlockAsync
  | typeof updateMetaDataParam
  | typeof updateUseLink
  | typeof changeBlockStart
  | typeof changeBlockStop
>
