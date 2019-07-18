import { Action } from 'typescript-fsa'
import { connect } from 'react-redux'
import { AppState } from '../store'
import { fetchSystemByCategory, addTags } from '../actions/action'
import CategoryButton from '../components/categoryButton'

export type CategorysActions = {
    addTags: (value: string) => Action<string>
    fetchSystemByCategory: (query: string) => void
}

function mapStateToProps(appState: AppState) {
    return appState.systems
}

function mapDispatchToProps(dispatch: any) {
    return {
        addTags: (value: string) => dispatch(addTags(value)),
        fetchSystemByCategory: (query: string) => dispatch(fetchSystemByCategory(query))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryButton)