
import React from "react"
import { Router } from "react-router"
import Routes from "./routes"
import { createBrowserHistory } from "history"
import { IntlProvider } from "react-intl"
import messages from "./shared/i18n"

export const history = createBrowserHistory()
const locale: "en" = "en"

function App(): JSX.Element {
  return (
    <IntlProvider defaultLocale={locale} locale={locale} key={locale} messages={messages[locale]}>
      <Router history={history}>
        <Routes />
      </Router>
    </IntlProvider>
  )
}

export default App
