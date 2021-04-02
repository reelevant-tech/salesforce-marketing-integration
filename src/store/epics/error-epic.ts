import { combineEpics, createEpicMiddleware, Epic } from "redux-observable"
import { catchError } from "rxjs/operators"

export const epicMiddleware = createEpicMiddleware()

export const epicMiddlewareRun = (allEpics: Epic[]) => {
  const combineEpicsAndCatchErrors = (...epics: Epic[]) => {
    return (action$: any, state$: any) => {
      epics = epics.map(epic => (action$, state$) =>
        epic(action$, state$, undefined).pipe(
          catchError((errors) => {
            console.error(errors)
            return []
          })
        )
      )
      return combineEpics(...epics)(action$, state$, undefined)
    }
  }

  const rootEpic = combineEpicsAndCatchErrors(...allEpics)
  return epicMiddleware.run(rootEpic)
}