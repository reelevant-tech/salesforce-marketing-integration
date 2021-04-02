import { combineReducers } from "redux"
import { connectRouter } from "connected-react-router"
import { History } from "history"

import block from "../features/Block/reducer"

export default function rootReducer(history: History) {
  return combineReducers({
    block,
    router: connectRouter(history)
  })
}
