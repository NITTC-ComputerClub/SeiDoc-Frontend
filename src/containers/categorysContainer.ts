import { Action } from 'typescript-fsa'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { AppState } from '../store'
import { fetchSystem, fetchSystemByCategory } from '../actions/action'
import CategoryButton from '../components/categoryButton'

export type CategorysActions = {
    fetchSystem: () => void
    fetchSystemByCategory: (query: string) => void
}

function mapStateToProps(appState: AppState) {
    return appState.systems
}

function mapDispatchToProps(dispatch: any) {
    return {
        fetchSystem: () => dispatch(fetchSystem()),
        fetchSystemByCategory: (query: string) => dispatch(fetchSystemByCategory(query))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryButton)