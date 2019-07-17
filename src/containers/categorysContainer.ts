import { Action } from 'typescript-fsa'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { AppState } from '../store'
import { fetchSystemByCategory, fetchSystemByAlgoliaSearch } from '../actions/action'
import CategoryButton from '../components/categoryButton'

export type CategorysActions = {
    fetchSystemByCategory: (query: string) => void
    fetchSystemByAlgoliaSearch: (query: string) => void
}

function mapStateToProps(appState: AppState) {
    return appState.systems
}

function mapDispatchToProps(dispatch: any) {
    return {
        fetchSystemByCategory: (query: string) => dispatch(fetchSystemByCategory(query)),
        fetchSystemByAlgoliaSearch: (query: string) => dispatch(fetchSystemByAlgoliaSearch(query))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryButton)