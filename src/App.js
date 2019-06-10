import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import './App.css';

import Api from './components/api'
import Search from './components/search'
import Category from './components/category'
import Detail from './components/detail'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      category: {}
    }
  }

  changeCategory = (value) => {
    this.setState({
      category: value
    })
    console.log(this.state.category)
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/api'>GET</Link></li>
            <li><Link to='/search'>検索画面</Link></li>
            <li><Link to='/category'>カテゴリー検索画面</Link></li>
            <li><Link to='/detail'>制度内容</Link></li>
          </ul>

          <hr />

          <Route exact path='/' component={Home} />
          <Route path='/api' render={() => <Api />} />
          <Route path='/search' render={() => <Search changeCategory={this.changeCategory} />} />
          <Route path='/category' render={() => <Category category={this.state.category}/>} />
          <Route path='/detail' render={() => <Detail detail={this.state.category}/>} />
        </div>
      </BrowserRouter>
    );
  }
}

const Home = () => (
  <div>
    <h2>Home</h2>
    <p>Welcome to ようこそ</p>
  </div>
)

export default App;
