import React from 'react'
import { Route, Switch } from 'react-router-dom';
import Category from './pages/category'
import Search from './pages/search'
import AdminInput from './pages/input'
import Detail from './pages/detail'
import ViewAll from './pages/viewAll'
import Top from './pages/top'
import Registration from './pages/registration';
import Login from './pages/login'
import SignUp from './pages/userRegistration'
import AdminSignIn from './admin/pages/signIn'
import AdminDetail from './admin/pages/detail'
import AdminCategory from './admin/pages/category'
import AdminStatus from './admin/pages/status'
import './scss/App.scss'

import ML from './pages/machineLearning'

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
        <Route path='/admin/category' component={AdminCategory}/>
        <Route path='/admin/newSystem' component={AdminInput} />
        <Route path='/admin/status' component={AdminStatus} />
      </Switch>
    </div>
  )
}

export default App;
