declare module "blocksdk" {
  interface BlockSDKOptions {
    /** Set the available width for the block editor. The editor may restrict the available values. */
    blockEditorWidth: string | number | undefined
    /** The editor displays the Content tab and any specified tabs. If an empty array is passed, only the Content tab appears. */
    tabs?: Array<any> // TODO: to be defined
  }
  export default class BlockSDK<T> {
    constructor(options?: BlockSDKOptions, whitelistOverride?: Array<string>, sslOverride?: boolean)
    getData(callback: (data: T) => void)
    setData(data: T, callback: (data: T) => void)
    setContent(content: string, callback: (content: string) => void)
  }
}
