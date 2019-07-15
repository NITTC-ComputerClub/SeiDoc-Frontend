import actionCreatorFactory from 'typescript-fsa'
import { Action } from 'typescript-fsa'
import { Dispatch } from "redux"
import { SystemState } from '../reducers/systemReducer'

export interface System {
    Name: string,
    Department: string,
    Location: string,
    Site: string,
    Detail: string,
    Target: string,
    Method: Array<string>,
    Category: Array<string>
}

const actionCreator = actionCreatorFactory()

export const systemFetch = {
    loadSystem: actionCreator.async<{}, System[]>('LOAD_SYSTEM')
}
export function loadAllSystem() {
    return (dispatch: Dispatch<Action<any>>, getState: () => SystemState<System>) => {
        return new Promise<System>((resolve, reject) => {
            dispatch(systemFetch.loadSystem.started({ params: {} }))
            fetch('https://script.googleusercontent.com/macros/echo?user_content_key=IoHQsv9bVzmPxlj0JrzpZu8-bMOFCP-aOy6MagzjbqTUjX7ZWnvNuDYtpaRKNzRrkY5Uf0t7cazxBMPH0KJb4np7J8BCtmwXm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnMzktTexFYrRIaapUjyBLsE5tL0B1WpvsST2ScRPWj3LGn1eoFquhGv_FmCDt-laYD9DOGu144H9&lib=MiOBqfRgCOdo7KPNv4oTDDfMEFKE191aw')
                .then(res => {
                    return res.json()
                        .then(json => {
                            if (res.ok) {
                                dispatch(systemFetch.loadSystem.done({ result: json, params: {} }))
                                resolve(json)
                            } else {
                                dispatch(systemFetch.loadSystem.failed({ error: json, params: {} }))
                                reject(new Error("..."))
                            }
                        })
                }).catch(error => {
                    dispatch(systemFetch.loadSystem.failed({ error: error, params: {} }))
                    reject(error)
                })
        })
    }
}

export const addTags = actionCreator<string>('ADD_TAGS')
export const deleteTags = actionCreator<string>('DELETE_TAGS')