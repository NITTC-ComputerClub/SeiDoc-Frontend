import * as React from 'react'
import SearchBar from './components/searchBar'
import Tags from './containers/tagsContainer'
import SystemCH from './containers/systemContainer'

class App extends React.Component {
  render() {
    return (
      <div>
        <SearchBar />
        <Tags />
        <SystemCH />
      </div>
    )
  }
}

export default App