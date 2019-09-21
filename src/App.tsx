import React from 'react'
import { Route, Switch } from 'react-router-dom';
import Category from './user/pages/category'
import Search from './user/pages/search'
import AdminInput from './admin/pages/input'
import Detail from './user/pages/detail'
import ViewAll from './user/pages/viewAll'
import Top from './user/pages/top'
import Registration from './user/pages/registration';
import Login from './user/pages/login'
import SignUp from './user/pages/userRegistration'
import AdminSignIn from './admin/pages/signIn'
import AdminDetail from './admin/pages/detail'
import AdminStatus from './admin/pages/status'
import AdminSearch from './admin/pages/search'
import AdminTop from './admin/pages/top'
import CSVDownload from './admin/pages/csvDownload'
import AdminRanking from './admin/pages/ranking'
import './scss/App.scss'

import ML from './user/pages/machineLearning'

const App: React.FC = () => {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={Top} />
        <Route path='/category' component={Category} />
        <Route path='/search' component={Search} />} />
        <Route path='/detail/:documentId' component={Detail} />
        <Route path='/login' component={Login} />
        <Route path='/signup' component={SignUp} />

        {/* MVP4で使えそう？ (inputとregistrationは機能被ってる)*/}
        <Route path='/view' component={ViewAll} />
        <Route path='/registration' component={Registration} />

        {/* MVP5 */}
        <Route path='/ml' component={ML} />
        
        <Route path='/admin/login' component={AdminSignIn} />
        <Route path='/admin/detail/:documentId' component={AdminDetail} />
        <Route path='/admin/newSystem' component={AdminInput} />
        <Route path='/admin/status' component={AdminStatus} />
        <Route path='/admin/search' component={AdminSearch} />
        <Route path='/admin/download' component={CSVDownload} />
        <Route path='/admin/ranking' component={AdminRanking} />
        <Route path='/admin/' component={AdminTop} />
      </Switch>
    </div>
  )
}

export default App;
