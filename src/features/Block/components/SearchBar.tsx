import React, { useState } from "react"
import { useIntl } from "react-intl"
// @ts-expect-error salesforce doesnt export types
import { IconSettings, Combobox } from "@salesforce/design-system-react"
import utilitySprite from "@salesforce-ux/design-system/assets/icons/utility-sprite/svg/symbols.svg"

type selection =
  | {
      id: string,
      label: string
    }
  | undefined

const SearchBar = <T extends readonly string[]>(
  {
    onSubmit,
    domains
  }: {
    domains: T
    onSubmit: (resp: { value: string; domain: T[number] }) => void
  }) => {
  const intl = useIntl()
  const items = domains.map((domain, i) => ({
    id: domain,
    label: domain,
    value: intl.formatMessage({ id: `searchDomain.${domain}` })
  }))

  const [keyword, setKeyword] = useState("")
  const [domain, setDomain] = useState(items[0])
  const [selection, setSelection] = useState([] as selection[])

  const reset = () => {
    setKeyword("")
    setSelection([])
  }

  const domainSelector = () => (
    <Combobox
      events={{
        onSelect: (event: Event, data: { selection: typeof items }) => {
          if (data && data.selection) {
            setDomain(data.selection[0])
          }
          reset()
        }
      }}
      options={items}
      selection={[domain]}
      value={domain?.value}
      variant="readonly"
    />
  )

  return (
    <IconSettings utilitySprite={utilitySprite}>
      <Combobox
        labels={{
          placeholder: intl.formatMessage({ id: "searchBar.placeholder" })
        }}
        events={{
          onChange: (_event: Event, { value }: Record<"value", string>) => {
            setKeyword(value)
          },
          onSubmit: () => {
            setSelection([{ id: "1", label: keyword }])
            if (onSubmit) {
              onSubmit({ value: keyword, domain: domain.label as T[number] })
            }
          },
          onRequestRemoveSelectedOption: () => {
            reset()
            if (onSubmit) {
              onSubmit({ value: "", domain: domain.label as T[number] })
            }
          }
        }}
        options={[]}
        selection={selection}
        value={keyword}
        isOpen={false}
        entityCombobox={items ? domainSelector() : null}
        variant="inline-listbox"
      />
    </IconSettings>
  )
}

export default SearchBar
