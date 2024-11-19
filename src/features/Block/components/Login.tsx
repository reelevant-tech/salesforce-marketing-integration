import React, { ChangeEvent, useState } from "react"
import { Redirect } from "react-router-dom"
import { Spinner, Card, IconSettings, DataTableColumn, DataTable, Input, Button } from "@salesforce/design-system-react"
import { FormattedMessage } from "react-intl"
import SearchBar from "./SearchBar"
import { storeOrRefresh, auth, client_id } from "../../../services/reelevant"

import standardSprite from "@salesforce-ux/design-system/assets/icons/standard-sprite/svg/symbols.svg"

const BlockListView: React.FC = () => {
  const [options, setOptions] = useState<{ username: string, password: string, error?: string }>()
  console.log(options)
  return (
    <IconSettings standardSprite={standardSprite}>
      <Card heading={<FormattedMessage id="auth.heading" />}>
        <div style={{ margin: "auto", display: 'flex', justifyContent: 'center', flexDirection: 'column', maxWidth: '80%' }}>
          {typeof options?.error !== 'undefined' ? <div>{options.error}</div> : null}
          <Input
            label={<FormattedMessage id="auth.username" />}
            onChange={(event: ChangeEvent<HTMLInputElement>) => setOptions(Object.assign(JSON.parse(JSON.stringify(options ?? {})), { username: event.target.value }))}
          />
          <Input
            label={<FormattedMessage id="auth.password" />}
            type="password"
            onChange={(event: ChangeEvent<HTMLInputElement>) => setOptions(Object.assign(JSON.parse(JSON.stringify(options ?? {})), { password: event.target.value }))}
          />
          <Button
            disabled={typeof options?.password === 'undefined' || typeof options?.username === 'undefined' || options.username.length < 3 || options.password.length < 3}
            onClick={async () => {
              setOptions(Object.assign(JSON.parse(JSON.stringify(options ?? {})), { error: undefined }))
              const res = await auth.Authentification.getToken({}, {
                client_id,
                grant_type: 'password',
                username: options!.username,
                password: options!.password
              }, { validateStatus: () => true })
              if (res.status === 200) {
                await storeOrRefresh(res.data.refresh_token!)
                window.location.href = '/'
                return
              }
              console.log(res.data)
              setOptions(Object.assign(JSON.parse(JSON.stringify(options ?? {})), { error: (res.data as any).message }))
            }}
            style={{ height: 'auto', marginTop: '20px' }}
          ><FormattedMessage id="auth.login" /></Button>
        </div>
      </Card>
    </IconSettings>
  )
}

export default BlockListView
