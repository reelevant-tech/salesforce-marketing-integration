import BlockSDK from "blocksdk"

export const blockInstance = new BlockSDK<{
  workflow: string
  entrypointIndex: number
}>(
  undefined,
  [window.location.host, "exacttarget\\.com", "marketingcloudapps\\.com", "blocktester\\.herokuapp\\.com", "sfmc-content\\.com"],
  false
)
