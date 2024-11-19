import React, { SyntheticEvent, useEffect, useMemo, useState } from "react"
import { useHistory } from "react-router-dom"
import { FormattedMessage, useIntl } from "react-intl"
import {
  IconSettings,
  Card,
  Button,
  Spinner,
  Combobox,
  DataTable,
  DataTableColumn
} from "@salesforce/design-system-react"
import ActionTableCell from "./ActionTableCell"

import standardSprite from "@salesforce-ux/design-system/assets/icons/standard-sprite/svg/symbols.svg"
import utilitySprite from "@salesforce-ux/design-system/assets/icons/utility-sprite/svg/symbols.svg"
import {workflows} from "../../../services/reelevant"
import {useAsyncMemo} from "use-async-memo"
import { blockInstance } from '../../../services/blockCommunicator'

export default function BlockConfig() {
  const workflowId = useMemo(() => window.location.pathname.split('/').pop()!, [])
  const history = useHistory()
  const intl = useIntl()

  // get workflow + SF data
  const blockData = useAsyncMemo(() => new Promise<Parameters<typeof blockInstance['setData']>[0]>(resolve => blockInstance.getData(data => resolve(data))), [])
  const workflow = useAsyncMemo(async () => {
    const workflow = await workflows.Workflow.get({ id: workflowId })
    return workflow.data.data
  }, [workflowId])
  const [selectedZone, setSelectedZone] = useState<number>()

  console.log(workflow)

  useEffect(() => {
    if (typeof blockData === 'undefined') return
    if (workflowId !== blockData.workflow) return
    setSelectedZone(blockData.entrypointIndex)
  }, [blockData])

  // compute all available zones and if they are already selected
  const zones = useMemo(() => {
    if (typeof workflow === 'undefined') return []
    return workflow.urls?.map((url, idx) => {
      const { type } = Object.values(workflow.versions[0].definition.entrypoints)[idx]
      return {
        id: idx.toString(),
        selected: selectedZone === idx ? 'yes' : 'no',
        type: intl.formatMessage({ id: `workflowPage.zone.description.type.${type}` }),
        name: intl.formatMessage({ id: 'workflowPage.zone.description' }, { index: idx + 1 })
      }
    }) ?? []
  }, [workflow, selectedZone])

  if (typeof workflow === 'undefined' || typeof blockData === 'undefined') {
    return (
      <div className="slds-align_absolute-center" style={{ height: "100%" }}>
        <Spinner />
      </div>
    )
  }

  return (
    <IconSettings standardSprite={standardSprite} utilitySprite={utilitySprite}>
      <Card
        heading={workflow?.name}
        headerActions={
          <Button
            label={<FormattedMessage id="workflowPage.button.changeWorkflow" />}
            onClick={() => {
              history.push("/")
            }}
          />
        }
        bodyClassName="slds-card__body_inner"
      >
        <h1 className="slds-text-title_caps mb-2">
          <FormattedMessage id="workflowPage.section.zone" />
        </h1>
        <br />
        <DataTable items={zones} id="workflowPage" fixedLayout>
            <DataTableColumn
              width="50%"
              truncate
              key="name"
              label={<FormattedMessage id="workflowPage.column.name" />}
              property="name"
            >
              {/* @ts-ignore  Property 'item' is missing in type '{}' but required in type '{ item: Block; }' */}
              <ActionTableCell propertyOnClick='id' onClick={id => {
                const zoneIndex = parseInt(id)
                setSelectedZone(zoneIndex)
                blockInstance.setData({ workflow: workflowId, entrypointIndex: zoneIndex }, () => {})
                blockInstance.setContent(`<a href="${workflow.urls![zoneIndex].click}"><img src=${workflow.urls![zoneIndex].display}></a>`, () => {})
              }}/>
            </DataTableColumn>
            <DataTableColumn
              width="50%"
              truncate
              key="type"
              label={<FormattedMessage id="workflowPage.column.type" />}
              property="type"
            />
            <DataTableColumn
              width="50%"
              truncate
              key="selected"
              label={<FormattedMessage id="workflowPage.column.selected" />}
              property="selected"
            />
          </DataTable>
      </Card>
    </IconSettings>
  )
}
