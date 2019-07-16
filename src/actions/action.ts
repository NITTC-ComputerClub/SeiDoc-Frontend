import actionCreatorFactory from 'typescript-fsa'

const actionCreator = actionCreatorFactory()

export const systemFetch = actionCreator.async('SYSTEM_FETCH')

export const addTags = actionCreator<string>('ADD_TAGS')
export const deleteTags = actionCreator<string>('DELETE_TAGS')