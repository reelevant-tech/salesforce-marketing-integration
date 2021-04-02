
import type { Block, BlockGroup } from '@rlvt/blocks-openapi-client'

export type BlockWithGroup = Block & {
  blockGroup: BlockGroup
}

export interface MetaData extends Record<string, any> {
  id: string
  name: string
  campaignName?: string
  imageURL: string
  linkURL: string
  parameters?: Record<string, string>
  useLink: boolean
}

export type BlockState = {
  isInit: boolean
  changeBlock: boolean
  metadata: MetaData | null
  isLoading: Record<"list" | "block", boolean>
  list: Block[] | []
  block: Block | null
}

export type BlockListFilter = {
  keyword: string
  domain: "block" | "campaign"
}
