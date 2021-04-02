import { StateType, ActionType } from "typesafe-actions"
import { Epic } from "redux-observable"
import createRootReducer from "./root-reducer"
import { allEpics } from "./root-epic"

import { createBrowserHistory } from "history"
import { composeWithDevTools } from "redux-devtools-extension"
import { routerMiddleware } from "connected-react-router"
import { createStore, applyMiddleware } from "redux"
import { epicMiddleware, epicMiddlewareRun } from './epics/error-epic'

export const history = createBrowserHistory()

const store = createStore(
  createRootReducer(history),
  {},
  composeWithDevTools(
    applyMiddleware(routerMiddleware(history), epicMiddleware)
  )
)
epicMiddlewareRun(allEpics)

export default store
export type RootState = StateType<ReturnType<typeof createRootReducer>>
export type RootAction = ActionType<typeof import("./root-actions").default>
export type RootEpic = Epic<RootAction, RootAction, RootState>
