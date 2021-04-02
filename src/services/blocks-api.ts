import BlockSDK from "@rlvt/blocks-openapi-client"
import createClient, {ClientType} from '@rlvt/openapi-client-utils'
import { BlockWithGroup } from "../features/Block/types"

const sdk = new BlockSDK(createClient({
  type: ClientType.BLOCKS,
  authenticationType: {
    grantType: 'refresh_token',
    refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbklkIjoiNzlkM2U3NGMtODI4Zi00MDU2LThiZWQtMjlmYTgyN2Q4ZGQ1IiwiaXNTdXBlckFkbWluIjpmYWxzZSwiaWF0IjoxNjE1ODg5Njc2LCJzdWIiOiI1ZWQ3Y2RlNGI2OWI2ZDAwMTk4YWRiZjIifQ.kZVdVeITpl06C9cQo84La45zbpaMnLnfEiThQ_kWb4E'
  }
}))

export async function filteredList(
  {
    keyword,
    domain
  }: {
    keyword: string,
    domain: "block" | "campaign"
  }): Promise<BlockWithGroup[]> {
  const searchFilter = domain === 'block' && keyword.length > 0 ? `name:regex>${keyword},` : ``
  const blocks = await sdk.Block.list({
    filter: `${searchFilter}status:generated`,
    page: 1,
    per_page: 10,
    sort: 'createdAt:desc',
    campaignName: domain === "campaign" && keyword.length > 0 ? keyword : undefined
  })
  // extend block with related campaign's names
  const groups = await sdk.Group.list({
    filter: `_id:${blocks.data.data.map(block => block.campaignId).join('|')}`
  })
  return (blocks.data.data as BlockWithGroup[]).map(b => {
    b.blockGroup = groups.data.data.find(group => group._id === b.campaignId)!
    return b
  })
}

export async function getBlock(id: string): Promise<BlockWithGroup> {
  const block = await sdk.Block.get({ id })
  const group = await sdk.Group.list({ filter: `_id:${block.data.data.campaignId}` })
  return Object.assign(block.data.data, { blockGroup: group.data.data[0] })
}
