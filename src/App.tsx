import * as React from 'react'
import Tags from './containers/tagsContainer'
import Category from './atoms/category'

class App extends React.Component {
  render() {
    return (
      <div>
        <Tags />
        <Category />
      </div>
    )
  }
}

export default App