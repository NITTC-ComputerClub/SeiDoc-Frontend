import { Action } from 'typescript-fsa'
import { connect } from 'react-redux'
import { AppState } from '../store'
import { fetchSystemByCategory, fetchSystemByAlgoliaSearch,  addTags } from '../actions/action'
import CategoryButton from '../components/categoryButton'

export type CategorysActions = {
    addTags: (value: string) => Action<string>
    fetchSystemByCategory: (query: string) => void
    fetchSystemByAlgoliaSearch: (query: string) => void
}

function mapStateToProps(appState: AppState) {
    return appState.systems
}

function mapDispatchToProps(dispatch: any) {
    return {
        fetchSystemByCategory: (query: string) => dispatch(fetchSystemByCategory(query)),
        fetchSystemByAlgoliaSearch: (query: string) => dispatch(fetchSystemByAlgoliaSearch(query)),
        addTags: (value: string) => dispatch(addTags(value))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryButton)
