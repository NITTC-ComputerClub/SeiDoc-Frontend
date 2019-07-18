import { connect } from 'react-redux'
import { AppState } from '../store'
import SystemList from '../components/systemList'

function mapStateToProps(appState: AppState){
    return appState.systems
}

export default connect(mapStateToProps)(SystemList)