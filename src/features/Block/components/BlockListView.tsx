import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Redirect } from "react-router-dom"
// @ts-expect-error salesforce doesnt export types
import { Spinner, Card, IconSettings, DataTableColumn, DataTable } from "@salesforce/design-system-react"
import { FormattedMessage } from "react-intl"
import { getBlockListAsync, getMetaDataAsync } from "../actions"
import * as selectors from "../selectors"
import SearchBar from "./SearchBar"
import ActionTableCell from "./ActionTableCell"

import standardSprite from "@salesforce-ux/design-system/assets/icons/standard-sprite/svg/symbols.svg"

const BlockListView: React.FC = () => {
  const blockList = useSelector(selectors.selectBlockList)
  const isLoading = useSelector(selectors.selectListIsLoading)
  const isInit = useSelector(selectors.selectIsInit)
  const blockId = useSelector(selectors.selectMetaBlockId)
  const blockChange = useSelector(selectors.selectBlockChange)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getMetaDataAsync.request())
    dispatch(getBlockListAsync.request({ domain: "block", keyword: "" }))
  }, [dispatch])

  if (isInit === false) {
    return (
      <div className="slds-align_absolute-center" style={{ height: "100%" }}>
        <Spinner />
      </div>
    )
  }

  if (isInit === true && blockId !== undefined && blockChange === false) {
    return <Redirect push to={`/block/${blockId}`} />
  }

  const domains = ["block", "campaign"] as const
  return (
    <IconSettings standardSprite={standardSprite}>
      <Card heading={<FormattedMessage id="blockList.heading" />}>
        <SearchBar<typeof domains>
          domains={domains}
          onSubmit={({ value, domain }) => {
            dispatch(getBlockListAsync.request({ keyword: value, domain }))
          }}
        />
        <div style={{ overflow: "auto" }}>
          {/* DataTable uses chidlren composition pattern. Need custom type declaration to avoid ts-ignore below  */}
          <DataTable items={blockList} id="DataTableExample-1-default" fixedLayout>
            <DataTableColumn
              width="50%"
              truncate
              key="name"
              label={<FormattedMessage id="blockList.column.blockName" />}
              property="name"
            >
              {/* @ts-ignore  Property 'item' is missing in type '{}' but required in type '{ item: Block; }' */}
              <ActionTableCell />
            </DataTableColumn>
            <DataTableColumn
              width="50%"
              truncate
              key="campaignName"
              label={<FormattedMessage id="blockList.column.campaignName" />}
              property="campaignName"
            />
          </DataTable>
          <div style={{ textAlign: "center" }}>
            {!isLoading && blockList.length === 0 ? (
              <h3>
                <FormattedMessage id="blockList.emptyMessage" />
              </h3>
            ) : null}
          </div>
          <div style={{ textAlign: "center" }}>{isLoading ? <Spinner /> : null}</div>
        </div>
      </Card>
    </IconSettings>
  )
}

export default BlockListView
