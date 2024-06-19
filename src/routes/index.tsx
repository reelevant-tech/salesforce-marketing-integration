import React from "react"
import { Route, Switch } from "react-router-dom"
import WorkflowList from "../features/Block/components/WorkflowList"
import WorkflowPage from "../features/Block/components/WorkflowPage"

const routes = [
  {
    key: "1",
    path: ["/"],
    component: WorkflowList
  },
  {
    key: "2",
    path: ["/workflow/:id"],
    component: WorkflowPage
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
