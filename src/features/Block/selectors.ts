import type { RootState } from "../../store"

export const selectBlockList = (state: RootState) => state.block.list
export const selectListIsLoading = (state: RootState) => state.block.isLoading.list
export const selectBlockIsLoading = (state: RootState) => state.block.isLoading.block
export const selectIsInit = (state: RootState) => state.block.isInit
export const selectMetaBlockId = (state: RootState) => state.block.metadata?.id
export const selectBlockChange = (state: RootState) => state.block.changeBlock
export const selectBlock = (state: RootState) => state.block.metadata
export const selectUseLink = (state: RootState) => state.block.metadata?.useLink
