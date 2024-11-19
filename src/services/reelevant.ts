import EntityManagerClient from '@rlvt/entity-manager-openapi-client'
import WorkflowsSDK, { WorkflowStatus } from "@rlvt/workflows-openapi-client"

export const entity = new EntityManagerClient({
  baseURL: 'https://api.reelevant.com/v2/entities'
})
export const auth = new EntityManagerClient({
  baseURL: 'https://api.reelevant.com/v2/'
})
export const workflows = new WorkflowsSDK({
  baseURL: 'https://api.reelevant.com/v2/'
})

let currentAccessToken: string | undefined
export const client_id = '79e88f1b-39fa-4c65-b998-91b8cfe6956c'

export const storeOrRefresh = async (refreshToken?: string): Promise<boolean> => {
  const storedToken = localStorage.getItem('rlvt_refresh')
  const refresh =  storedToken !== null && storedToken.length > 0 ? storedToken : refreshToken
  if (typeof refresh === 'string') {
    const access = await auth.Authentification.getToken({}, {
      client_id,
      refresh_token: refresh,
      grant_type: 'refresh_token'
    })
    currentAccessToken = access.data.access_token
    entity.axios.defaults.headers['Authorization'] = currentAccessToken
    workflows.axios.defaults.headers['Authorization'] = currentAccessToken
    localStorage.setItem('rlvt_refresh', refresh ?? '')
    return true
  }
  return false
}
