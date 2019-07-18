import { Action } from 'typescript-fsa'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { AppState } from '../store'
import { deleteTags, deleteSystems } from '../actions/action'
import Tags from '../components/tags'

export type TagsActions = {
    deleteTags: (value: string) => Action<string>
    deleteSystems: () => Action<void>
}

function mapStateToProps(appState: AppState) {
    return appState.tags
}

function mapDispatchToProps(dispatch: Dispatch<Action<void | string>>) {
    return {
        deleteTags: (value: string) => dispatch(deleteTags(value)),
        deleteSystems: () => dispatch(deleteSystems())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tags)