import { Action } from 'typescript-fsa'
import { connect } from 'react-redux'
import { AppState } from '../store'
import { fetchSystemByCategory } from '../actions/action'
import CategoryButton from '../components/categoryButton'
import { ThunkDispatch } from 'redux-thunk';
import { SystemsState } from '../reducers/categorysReducer';

export type CategorysActions = {
    fetchSystemByCategory: (query: string) => void
}

function mapStateToProps(appState: AppState) {
    return appState.systems
}

function mapDispatchToProps(dispatch: ThunkDispatch<SystemsState, void, Action<firebase.firestore.DocumentData>>) {
    return {
        fetchSystemByCategory: (query: string) => dispatch(fetchSystemByCategory(query))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryButton)