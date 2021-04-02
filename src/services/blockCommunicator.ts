import BlockSDK from "blocksdk"
import { bindCallback } from "rxjs"

const SSL_OVERRIDE = process.env.REACT_APP_URL_BLOCKSDK_SSL_OVERRIDE === "true"


export default function blockCommunicatorFactory<T>() {
  const blockInstance: BlockSDK<T> = new BlockSDK(
    undefined,
    [window.location.host, "exacttarget\\.com", "marketingcloudapps\\.com", "blocktester\\.herokuapp\\.com"],
    SSL_OVERRIDE
  )
  const methods = ["setData", "getData", "setContent"]
  return Object.values(methods).reduce((acc, method) => {
    acc[method] = bindCallback(blockInstance[method as keyof BlockSDK<T>].bind(blockInstance))
    return acc
  }, {} as Record<string, ReturnType<typeof bindCallback>>)
}
