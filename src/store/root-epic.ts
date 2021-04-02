import * as epicBlockConfig from "../features/Block/epics"
import { Epic } from "redux-observable"

export const allEpics: Epic[] = [...Object.values(epicBlockConfig)]
