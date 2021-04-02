import { routerActions } from "connected-react-router"
import * as blockActions from "../features/Block/actions"

const rootActions = {
  router: routerActions,
  block: blockActions
}

export default rootActions
