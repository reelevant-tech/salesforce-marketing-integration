import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import "./main.less"

function renderToDOM() {
  if (document.getElementById("root") !== null) {
    ReactDOM.render(<App />, document.getElementById("root"))
  }
}
renderToDOM()
export { renderToDOM }
