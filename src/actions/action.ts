import actionCreatorFactory from 'typescript-fsa'

const actionCreator = actionCreatorFactory()

export const init = actionCreator('INIT')
export const updateNum = actionCreator('UPDATE_NUM')
export const setNum = actionCreator<number>('SET_NUM')