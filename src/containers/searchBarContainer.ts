import { connect } from 'react-redux'
import { fetchSystemByAlgoliaSearch } from '../actions/action'
import SearchBar from '../components/searchBar'
import { AppState } from '../store'

export type searchBarActions = {
    fetchSystemByAlgoliaSearch: (query: string, category: string[]) => void
}

function mapDispatchToProps(dispatch: any) {
    return {
        fetchSystemByAlgoliaSearch: (query: string, category: string[]) => dispatch(fetchSystemByAlgoliaSearch(query, category)),
    }
}

function mapStateToProps(appState: AppState) {
    return appState.tags
}


export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)
