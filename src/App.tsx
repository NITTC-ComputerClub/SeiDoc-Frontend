import * as React from 'react'
import Category from './atoms/category'
import Result from './atoms/result'

class App extends React.Component {
  render() {
    return (
      <div>
        <Category />
        <Result />
      </div>
    )
  }
}

export default App