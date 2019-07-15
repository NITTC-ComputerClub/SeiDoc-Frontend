import actionCreatorFactory from 'typescript-fsa'

const actionCreator = actionCreatorFactory()

export const systemActions = {
    setName: actionCreator<string>('SET_NAME'),
    setDepartment: actionCreator<string>('SET_DEPARTMENT'),
    setLocation: actionCreator<string>('SET_LOCATION'),
    setSite: actionCreator<string>('SET_SITE'),
    setDetail: actionCreator<string>('SET_DETAIL'),
    setTarget: actionCreator<string>('SET_TARGET'),
    setMethod: actionCreator<Array<string>>('SET_METHOD'),
    setCategory: actionCreator<Array<string>>('SET_CATEGORY')
}

export const addCategory=actionCreator<Array<string>>('ADD_CATEGORY')

