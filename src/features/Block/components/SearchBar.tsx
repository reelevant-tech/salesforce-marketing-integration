import React, { useState } from "react"
import { useIntl } from "react-intl"
import { IconSettings, Combobox } from "@salesforce/design-system-react"
import utilitySprite from "@salesforce-ux/design-system/assets/icons/utility-sprite/svg/symbols.svg"

const SearchBar = (
  {
    onSubmit,
  }: {
    onSubmit: (resp: { value?: string }) => void
  }) => {
  const intl = useIntl()

  return (
    <IconSettings utilitySprite={utilitySprite}>
      <Combobox
        labels={{
          placeholder: intl.formatMessage({ id: "searchBar.placeholder" })
        }}
        events={{
          onChange: (_event: Event, { value }: Record<"value", string>) => onSubmit({ value }),
        }}
        options={[]}
        isOpen={false}
        variant="inline-listbox"
      />
    </IconSettings>
  )
}

export default SearchBar
