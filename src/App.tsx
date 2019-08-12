import React from 'react'
import { Route, Switch } from 'react-router-dom';
import Category from './pages/category'
import Result from './pages/result'
import Input from './pages/input'
import Detail from './pages/detail'
import ViewAll from './pages/viewAll'
import Top from './pages/top'
import Registration from './pages/registration';
import Header from './pages/header'
import Login from './pages/login'
import SignUp from './pages/userRegistration'
import './scss/App.scss'

const App: React.FC = () => {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path='/' component={Top} />
        <Route path='/category' component={Category} />
        <Route path='/result' component={Result} />
        <Route path='/input' component={Input} />
        <Route path='/detail/:documentId' component={Detail} />
        <Route path='/view' component={ViewAll} />
        <Route path='/registration' component={Registration} />
        <Route path='/login' component={Login} />
        <Route path='/signup' component={SignUp} />
      </Switch>
    </div>
  )
}


export default App
