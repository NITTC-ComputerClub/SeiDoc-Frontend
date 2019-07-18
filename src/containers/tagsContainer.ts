import { Action } from 'typescript-fsa'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { AppState } from '../store'
import { deleteTags } from '../actions/action'
import Tags from '../components/tags'

export type TagsActions = {
    deleteTags: (value: string) => Action<string>
}

function mapStateToProps(appState: AppState) {
    return appState.tags
}

function mapDispatchToProps(dispatch: Dispatch<Action<string>>) {
    return {
        deleteTags: (value: string) => dispatch(deleteTags(value))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tags)