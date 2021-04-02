import type { BlockWithGroup, MetaData } from "./types"

export function blockToMeta(block: BlockWithGroup): MetaData {
  return {
    id: block.id,
    name: block.name,
    campaignName: block.blockGroup.name,
    imageURL: block.urls!.image,
    linkURL: block.urls!.link,
    parameters: block.urls!.params.reduce((acc, current) => {
      acc[current.key] = (block.parameters && block.parameters[current.key]) ?? ""
      return acc
    }, {} as Record<string, string>),
    useLink: true
  }
}

/**
 * merge local metada with foreign one
 * @param local metadata currently used by a block on SMC
 * @param foreign metadata derived from block configuration on Reelevant API
 * @returns Metadata
 */
export function mergeMetas(local: MetaData, foreign: MetaData): MetaData {
  if (!local.parameters || !foreign.parameters) {
    return foreign
  }
  // foreign always true about keys from url parameters but its values are only used if there is none locally defined
  const parameters = Object.entries(foreign.parameters).reduce((acc, entry) => {
    const [key, value] = entry
    acc[key] = local.parameters?.[key] || value || ""
    return acc
  }, {} as Record<string, string>)
  return { ...foreign, parameters }
}

// TODO: add clickable
export function getBlockHTML(block: MetaData): string {
  const imageURL = generateURL(block.imageURL, block.parameters)
  const img = `<img src="${imageURL}">`
  if (block.useLink) {
    const linkURL = generateURL(block.linkURL, block.parameters)
    return `<a href="${linkURL}">${img}</a>`
  } else {
    return img
  }
}

function generateURL(baseURL: string, parameters?: Record<string, string>): URL {
  const url = new URL(baseURL)
  if (parameters) {
    const params = url.searchParams
    Object.entries(parameters).forEach(([key, value]) => {
      params.append(key, value)
    })
  }
  return url
}
