
import React from "react"
import { Provider } from "react-redux"
import { ConnectedRouter } from "connected-react-router"
import Routes from "./routes"
import store, { history } from "./store"
import { IntlProvider } from "react-intl"
import messages from "./shared/i18n"

const locale: "en" | "fr" = "en"

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <IntlProvider defaultLocale={locale} locale={locale} key={locale} messages={messages[locale]}>
        <ConnectedRouter history={history}>
          <Routes />
        </ConnectedRouter>
      </IntlProvider>
    </Provider>
  )
}

export default App
