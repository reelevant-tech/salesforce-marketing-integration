
import React from "react"
import { Provider } from "react-redux"
import { ConnectedRouter } from "connected-react-router"
import Routes from "./routes"
import store, { history } from "./store"
import { ConfigProvider } from "antd"
import { IntlProvider } from "react-intl"
import messages from "./shared/i18n"
import moment from "moment"
import frFR from "antd/lib/locale/fr_FR"
import enGB from "antd/lib/locale/en_GB"
import "moment/locale/fr"
import "moment/locale/en-gb"

const locale: "en" | "fr" = "en"
// if (locale === "") {
//   moment.locale("fr")
// } else {
//   moment.locale("en_GB")
// }

function App(): JSX.Element {
  return (
    <Provider store={store}>
        <ConfigProvider locale={locale === "fr" ? frFR : enGB}>
          <IntlProvider defaultLocale={locale} locale={locale} key={locale} messages={messages[locale]}>
            <ConnectedRouter history={history}>
              <Routes />
            </ConnectedRouter>

          </IntlProvider>
        </ConfigProvider>
    </Provider>
  )
}

export default App
