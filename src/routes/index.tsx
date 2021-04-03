import React from "react"
import { Route, Switch } from "react-router-dom"
import BlockListView from "../features/Block/components/BlockListView"
import BlockConfig from "../features/Block/components/BlockConfig"

const routes = [
  {
    key: "1",
    path: ["/"],
    component: BlockListView
  },
  {
    key: "2",
    path: ["/block/:id"],
    component: BlockConfig
  }
]


function Router() {
  return (
    <Switch>
      {routes.map(r =>
        r.path.map(path => <Route key={path} exact={true} path={path} component={r.component} />)
      )}
    </Switch>
  )
}

export default Router
