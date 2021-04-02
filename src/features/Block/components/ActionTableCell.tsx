import React, { PropsWithChildren } from "react"
import { useDispatch } from "react-redux"
// @ts-expect-error salesforce doesnt export types
import { DataTableCell } from "@salesforce/design-system-react"
import { setMetaDataAsync } from "../actions"

import { blockToMeta } from "../utils"
import { BlockWithGroup } from "../types"

const ActionTableCell: React.FC<PropsWithChildren<{ item: BlockWithGroup }>> = ({ children, ...props }) => {
  const dispatch = useDispatch()
  return (
    <DataTableCell {...props}>
      <span
        style={{
          cursor: "pointer"
        }}
        onClick={() => {
          const data = blockToMeta(props.item)
          dispatch(setMetaDataAsync.request(data))
        }}
      >
        {children}
      </span>
    </DataTableCell>
  )
}
ActionTableCell.displayName = DataTableCell.displayName

export default ActionTableCell
