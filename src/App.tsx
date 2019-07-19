import * as React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Category from './atoms/category'
import Result from './atoms/result'

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path='/' component={Category} />
          <Route path='/result' component={Result} />
        </div>
      </BrowserRouter>
    )
  }
}

export default App