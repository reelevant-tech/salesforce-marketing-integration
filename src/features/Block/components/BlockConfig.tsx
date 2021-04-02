import React, { SyntheticEvent, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { FormattedMessage } from "react-intl"
import {
  IconSettings,
  Card,
  Button,
  Spinner,
  Checkbox,
  Badge
  // @ts-expect-error salesforce doesnt export types
} from "@salesforce/design-system-react"
import InputRequired from "../../../shared/components/InputRequired"
import * as selectors from "../selectors"
import { changeBlockStart, getBlockAsync, updateMetaDataParam, updateUseLink } from "../actions"

import standardSprite from "@salesforce-ux/design-system/assets/icons/standard-sprite/svg/symbols.svg"
import utilitySprite from "@salesforce-ux/design-system/assets/icons/utility-sprite/svg/symbols.svg"

export default function BlockConfig() {
  const dispatch = useDispatch()
  const block = useSelector(selectors.selectBlock)
  const blockId = useSelector(selectors.selectMetaBlockId)
  const isLoading = useSelector(selectors.selectBlockIsLoading)
  const isLinkUsed = useSelector(selectors.selectUseLink)
  const history = useHistory()

  useEffect(() => {
    if (blockId) {
      dispatch(getBlockAsync.request(blockId))
    }
  }, [dispatch, blockId])

  if (isLoading) {
    return (
      <div className="slds-align_absolute-center" style={{ height: "100%" }}>
        <Spinner />
      </div>
    )
  }

  return (
    <IconSettings standardSprite={standardSprite} utilitySprite={utilitySprite}>
      <Card
        heading={block?.name}
        headerActions={
          <Button
            label={<FormattedMessage id="blockConfig.button.changeBlock" />}
            onClick={() => {
              dispatch(changeBlockStart())
              history.push("/")
            }}
          />
        }
        bodyClassName="slds-card__body_inner"
      >
        <div className="slds-float_right">
          {block && block.campaignName ? <Badge content={block && block.campaignName} /> : null}
        </div>
        <h1 className="slds-text-title_caps">
          <FormattedMessage id="blockConfig.section.urlParameters" />
        </h1>
        {block && block.parameters
          ? Object.entries(block.parameters).map(([key, value]) => (
              <InputRequired
                label={key}
                required={key !== "~rm~"}
                key={key}
                value={value}
                onChange={(e: SyntheticEvent, data: any) => {
                  dispatch(updateMetaDataParam({ key, value: data.value }))
                }}
                errorText={<FormattedMessage id="blockConfig.error.notEmpty" />}
              />
            ))
          : null}
        <Checkbox
          labels={{ label: <FormattedMessage id="blockConfig.section.addLink" /> }}
          checked={isLinkUsed}
          onChange={(e: SyntheticEvent, { checked }: { checked: boolean }) => {
            dispatch(updateUseLink(checked))
          }}
        />
      </Card>
    </IconSettings>
  )
}
