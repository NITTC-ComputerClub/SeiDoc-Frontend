import { Action } from 'typescript-fsa'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { AppState } from '../store'
import { systemFetch, fetchSystem } from '../actions/action'
import CategoryButton from '../components/categoryButton'

export type CategorysActions = {
    fetchSystem: () => void
}

function mapStateToProps(appState: AppState) {
    return appState.systems
}

function mapDispatchToProps(dispatch: any) {
    return {
        fetchSystem: () => dispatch(fetchSystem())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryButton)