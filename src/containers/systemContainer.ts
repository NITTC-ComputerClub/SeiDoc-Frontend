import { Action } from 'typescript-fsa'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { AppState } from '../store'
import { loadAllSystem } from '../actions/action'
import CategoryButton from '../components/categoryButton'


export interface SystemActions {
    loadAllSystem: () => void
}

function mapStateToProps(appState: AppState) {
    return appState.system
}

function mapDispatchToProps() {
    return {
        loadAllSystem
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryButton)