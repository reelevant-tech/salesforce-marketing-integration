import React, { useState } from "react"
import { Redirect } from "react-router-dom"
import { Spinner, Card, IconSettings, DataTableColumn, DataTable } from "@salesforce/design-system-react"
import { FormattedMessage } from "react-intl"
import SearchBar from "./SearchBar"
import ActionTableCell from "./ActionTableCell"
import { TokenStorage } from "../../../services/tokens"
import { list } from "../../../services/workflows-api"
import { useAsyncMemo } from "use-async-memo"

import standardSprite from "@salesforce-ux/design-system/assets/icons/standard-sprite/svg/symbols.svg"

const dataFormat = new Intl.DateTimeFormat('fr-FR', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })

const BlockListView: React.FC = () => {
  const refreshToken = TokenStorage.get('refresh')
  if (refreshToken === undefined || refreshToken.length === 0) {
    return (<div className="slds-align_absolute-center" style={{ height: "100%" }}>
      <FormattedMessage id="auth.require_authentication" />
    </div>)
  }
  const [search, setSearch] = useState<string>()
  const [selectedWorkflowId, setSelectedWorkflowId] = useState<string>()

  const workflows = useAsyncMemo(async () => {
    const workflows =  await list({ search })
    return workflows.map(workflow => Object.assign(workflow, { updatedAt: dataFormat.format(new Date(workflow.updatedAt)) }))
  }, [search])

  if (typeof workflows === 'undefined') {
    return (
      <div className="slds-align_absolute-center" style={{ height: "100%" }}>
        <Spinner />
      </div>
    )
  }

  if (selectedWorkflowId) {
    return <Redirect push to={`/workflow/${selectedWorkflowId}`} />
  }

  return (
    <IconSettings standardSprite={standardSprite}>
      <Card heading={<FormattedMessage id="blockList.heading" />}>
        <SearchBar
          onSubmit={({ value }) => {
            setSearch(value)
          }}
        />
        <div style={{ overflow: "auto" }}>
          <DataTable items={workflows} id="listPage" fixedLayout>
            <DataTableColumn
              width="50%"
              truncate
              key="name"
              label={<FormattedMessage id="blockList.column.name" />}
              property="name"
            >
              {/* @ts-ignore  Property 'item' is missing in type '{}' but required in type '{ item: Block; }' */}
              <ActionTableCell propertyOnClick='id' onClick={id => setSelectedWorkflowId(id)}/>
            </DataTableColumn>
            <DataTableColumn
              width="50%"
              truncate
              key="updatedAt"
              label={<FormattedMessage id="blockList.column.publishedAt" />}
              property="updatedAt"
            />
          </DataTable>
          <div style={{ textAlign: "center" }}>
            {typeof workflows !== 'undefined' && workflows.length === 0 ? (
              <h3>
                <FormattedMessage id="blockList.emptyMessage" />
              </h3>
            ) : null}
          </div>
        </div>
      </Card>
    </IconSettings>
  )
}

export default BlockListView
