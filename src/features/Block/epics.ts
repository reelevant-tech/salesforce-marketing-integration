import { from, of } from "rxjs"
import { filter, switchMap, mergeMap, catchError } from "rxjs/operators"
import { isActionOf } from "typesafe-actions"
import {
  getBlockAsync,
  getBlockListAsync,
  getMetaDataAsync,
  setMetaDataAsync,
  mergeMetaData,
  changeBlockStop,
  updateMetaDataParam,
  setContentAsync,
  updateUseLink
} from "./actions"
import services from "../../services"
import { blockToMeta, getBlockHTML } from "./utils"

import type { RootEpic } from "../../store"
import type { MetaData } from "./types"

const { getData, setData, setContent } = services.blockCommunicatorFactory<MetaData>()

export const getBlockListEpic: RootEpic = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(getBlockListAsync.request)),
    switchMap(action =>
      from(services.api.blocks.filteredList(action.payload)).pipe(
        mergeMap(blocks => [getBlockListAsync.success(blocks)]),
        catchError(error => of(getBlockListAsync.failure(error)))
      )
    )
  )

export const getBlockEpic: RootEpic = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(getBlockAsync.request)),
    switchMap(action =>
      from(services.api.blocks.getBlock(action.payload)).pipe(
        mergeMap(block => [getBlockAsync.success(block), mergeMetaData(blockToMeta(block))]),
        catchError(error => of(getBlockAsync.failure(error)))
      )
    )
  )

export const getMetaDataEpic: RootEpic = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(getMetaDataAsync.request)),
    mergeMap(() => {
      return getData().pipe(mergeMap(data => [getMetaDataAsync.success(data)]))
    })
  )

export const setMetaDataEpic: RootEpic = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(setMetaDataAsync.request)),
    mergeMap(action => {
      return setData(action.payload).pipe(
        mergeMap(data => [
          changeBlockStop(),
          setMetaDataAsync.success(data),
          setContentAsync.request(getBlockHTML(data))
        ])
      )
    })
  )

export const setContentEpic: RootEpic = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(setContentAsync.request)),
    mergeMap(action => {
      return setContent(action.payload).pipe(mergeMap(data => [setContentAsync.success(data)]))
    })
  )

export const updateMetaDataEpic: RootEpic = (action$, state$) =>
  action$.pipe(
    filter(isActionOf([updateMetaDataParam, updateUseLink])),
    switchMap(() => {
      const { metadata } = state$.value.block
      // @ts-ignore do something else if metadata is empty
      return [setMetaDataAsync.request(metadata)]
    })
  )
