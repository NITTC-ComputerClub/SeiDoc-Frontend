import * as React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Category from './atoms/category'
import Result from './atoms/result'
import Input from './atoms/input'
import Detail from './atoms/detail'
import './App.scss'

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Route exact path='/' component={Category} />
          <Route path='/result' component={Result} />
          <Route path='/input' component={Input} />
          <Route path='/detail' component={Detail} />
        </div>
      </BrowserRouter>
    )
  }
}

export default App