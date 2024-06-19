import React, { PropsWithChildren } from "react"
import { DataTableCell } from "@salesforce/design-system-react"

const ActionTableCell: React.FC<PropsWithChildren<{ propertyOnClick: string, item: Record<string, unknown>, onClick: (id: string) => void }>> = ({ children, ...props }) => {
  return (
    <DataTableCell {...props}>
      <span
        style={{
          cursor: "pointer"
        }}
        onClick={() => {
          props.onClick(props.item[props.propertyOnClick] as string)
        }}
      >
        {children}
      </span>
    </DataTableCell>
  )
}
ActionTableCell.displayName = DataTableCell.displayName

export default ActionTableCell
