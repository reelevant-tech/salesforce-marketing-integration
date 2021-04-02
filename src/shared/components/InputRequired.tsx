import React, { useEffect, useState } from "react"
// @ts-expect-error
import { Input } from "@salesforce/design-system-react"

/**
 * "extend" Input component from Salesforce Design System to automatically display `errorText` if a value is `required`
 */
export default function InputMandatory(props: Record<string, any>) {
  const [errorText, setErrorText] = useState("")
  const errorMessage = props.errorText || "mandatory"
  const myProps = Object.assign({}, props)
  myProps.errorText = errorText

  useEffect(() => {
    if (myProps.value === "" && myProps.required) {
      setErrorText(errorMessage)
    } else {
      setErrorText("")
    }
  }, [setErrorText, errorMessage, myProps.value, myProps.required])

  return <Input {...myProps} />
}
