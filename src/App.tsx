
import React from "react"
import { Redirect, Router } from "react-router"
import Routes from "./routes"
import { createBrowserHistory } from "history"
import { IntlProvider } from "react-intl"
import messages from "./shared/i18n"
import {useAsyncMemo} from "use-async-memo"
import {storeOrRefresh} from "./services/reelevant"
import {Spinner} from "@salesforce/design-system-react"

export const history = createBrowserHistory()
const locale: "en" = "en"

function App(): JSX.Element {
  const isLogged = useAsyncMemo(async () => {
    const isLogged = await storeOrRefresh()
    return isLogged
  }, [])

  if (typeof isLogged === 'undefined') {
    return (
      <div className="slds-align_absolute-center" style={{ height: "100%" }}>
        <Spinner />
      </div>
    )
  }
  if (isLogged === false) {
    return (
      <IntlProvider defaultLocale={locale} locale={locale} messages={messages[locale]}>
        <Router history={history}>
          <Routes />
          <Redirect push to={`/login`} />
        </Router>
      </IntlProvider>
    )
  }
  
  return (
    <IntlProvider defaultLocale={locale} locale={locale} messages={messages[locale]}>
      <Router history={history}>
        <Routes />
      </Router>
    </IntlProvider>
  )
}

export default App
