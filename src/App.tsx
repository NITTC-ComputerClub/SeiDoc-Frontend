import * as React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Category from './atoms/category'
import Result from './atoms/result'
import Input from './atoms/input'
import Detail from './atoms/detail'
import ViewAll from './atoms/viewAll'
import Login from './atoms/login'
import Registration from './atoms/registration';
import Top from './atoms/top'
import './scss/App.scss'

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Route exact path='/' component={Category} />
        <Route path='/result' component={Result} />
        <Route path='/input' component={Input} />
        <Route path='/detail' component={Detail} />
        <Route path='/view' component={ViewAll} />
        <Route path='/registration' component={Registration} />
        <Route path='/login' component={Login} />
        <Route path='/top' component={Top} />
      </BrowserRouter>
    )
  }
}

export default App
