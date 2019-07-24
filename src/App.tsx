import * as React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Category from './atoms/category'
import Result from './atoms/result'
import Detail from './components/detail'

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path='/' component={Category} />
          <Route path='/result' component={Result} />
          <Route path='/detail' component={Detail} />
        </div>
      </BrowserRouter>
    )
  }
}

export default App