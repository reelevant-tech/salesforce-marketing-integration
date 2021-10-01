import Cookies from "js-cookie"

const storageKeyByTokenType = {
  access: "accessToken",
  refresh: "refreshToken"
} as const


const domain = window.location.hostname.split(".").slice(-2).join(".")
const isSecureCookie = window.location.protocol === "https:"
/**
 * Helpers to store token
 */
export const TokenStorage = {
  get: (type: keyof typeof storageKeyByTokenType): string | undefined => {
    return Cookies.get(storageKeyByTokenType[type])
  },
  set: (type: keyof typeof storageKeyByTokenType, token: string) => {
    // set the cookie to the top level domain so its shared across all apps
    return Cookies.set(storageKeyByTokenType[type], token, {
      domain: domain.includes("reelevant") ? domain : undefined,
      secure: isSecureCookie,
      sameSite: 'none'
    })
  },
  remove: (type: keyof typeof storageKeyByTokenType) => {
    return Cookies.remove(storageKeyByTokenType[type], {
      domain: domain.includes("reelevant") ? domain : undefined,
      secure: isSecureCookie,
      sameSite: 'none'
    })
  }
}