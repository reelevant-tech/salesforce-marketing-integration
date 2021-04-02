import React from "react"
import { Route, Switch } from "react-router-dom"
import { routes } from "./routesConfig"

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
