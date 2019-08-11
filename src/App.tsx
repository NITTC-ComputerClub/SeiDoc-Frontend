import * as React from 'react'
import { Route, Switch } from 'react-router-dom';
import Category from './pages/category'
import Result from './pages/result'
import Input from './pages/input'
import Detail from './pages/detail'
import ViewAll from './pages/viewAll'
import Top from './atoms/top'
import Registration from './pages/registration';
import './scss/App.scss'

import SignIn from './components/Login/signIn'
import SignUp from './components/Login/signUp'

const App: React.FC = () => {
  return (
    <Switch>
      <Route exact path='/' component={Category} />
      <Route path='/result' component={Result} />
      <Route path='/input' component={Input} />
      <Route path='/detail/:documentId' component={Detail} />
      <Route path='/view' component={ViewAll} />
      <Route path='/registration' component={Registration} />
      <Route path='/signin' component={SignIn} />
      <Route path='/signup' component={SignUp} />
      <Route path='/top' component={Top} />
    </Switch>
  )
}


export default App
