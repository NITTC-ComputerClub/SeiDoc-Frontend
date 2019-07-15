import { Action } from 'typescript-fsa'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { AppState } from '../store'
import { init, updateNum, setNum } from '../actions/action'
import { AddComponent } from '../components/addComponent'


export interface NumActions {
    updateNum: () => Action<void>
    setNum: (value: number) => Action<number>
    init: () => Action<void>
}

function mapStateToProps(appState: AppState) {
    return appState.state
}

function mapDispatchToProps(dispatch: Dispatch<Action<any>>) {
    return {
        updateNum: () => dispatch(updateNum()),
        setNum: (value: number) => dispatch(setNum(value)),
        init: () => dispatch(init())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddComponent)
