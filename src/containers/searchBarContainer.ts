import { connect } from 'react-redux'
import { fetchSystemByAlgoliaSearch } from '../actions/action'
import SearchBar from '../components/searchBar'
import { AppState } from '../store'
import { Dispatch } from 'react';

export type searchBarActions = {
    fetchSystemByAlgoliaSearch: (query: string, category: string[]) => void
}

function mapStateToProps(appState: AppState) {
    return appState.tags
}

function mapDispatchToProps(dispatch: Dispatch<any>) {
    return {
        fetchSystemByAlgoliaSearch: (query: string, category: string[]) => dispatch(fetchSystemByAlgoliaSearch(query, category)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)
