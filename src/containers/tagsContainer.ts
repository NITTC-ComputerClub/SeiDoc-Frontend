import { Action } from 'typescript-fsa'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { AppState } from '../store'
import { addTags, deleteTags } from '../actions/action'
import Tags from '../components/tags'

export interface TagsActions {
    addTags: (value: string) => Action<string>
    deleteTags: (value: string) => Action<string>
}

function mapStateToProps(appState: AppState) {
    return appState.tags
}

function mapDispatchToProps(dispatch: Dispatch<Action<string>>) {
    return {
        addTags: (value: string) => dispatch(addTags(value)),
        deleteTags: (value: string) => dispatch(deleteTags(value))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tags)