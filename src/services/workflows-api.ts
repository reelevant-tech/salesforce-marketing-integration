import WorkflowsSDK, { WorkflowStatus } from "@rlvt/workflows-openapi-client"
import { createClient, ClientType } from '@rlvt/openapi-client-utils'
import { TokenStorage } from './tokens'

const sdk = new WorkflowsSDK(createClient({
  type: ClientType.WORKFLOWS,
  clientId: '79e88f1b-39fa-4c65-b998-91b8cfe6956c',
  authenticationType: {
    type: 'refresh_token',
    refreshToken: TokenStorage.get('refresh') as string
  }
}))

export async function list(
  {
    search
  }: {
    search?: string
  }) {
  const workflows = await sdk.Workflow.list({
    status: [WorkflowStatus.PUBLISHED],
    page: 1,
    perPage: 15,
    name: search !== undefined && search.trim().length > 0 ? search : undefined
  })
  return workflows.data.data
}

export async function get(id: string) {
  const workflow = await sdk.Workflow.get({ id })
  return workflow.data.data
}
