import React, {Component} from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import './App.css';

import Api from './components/api'

class App extends Component {
  render(){
    return (
      <BrowserRouter>
        <div>
          <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/about'>About</Link></li>
            <li><Link to='/friends'>Friends</Link></li>
            <li><Link to='/api'>GET</Link></li>
          </ul>

          <hr />

          <Route exact path='/' component={Home} />
          <Route path='/about' component={About} />
          <Route path='/friends' component={Friends} />
          <Route path='/api' render={() => <Api />} />
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
const About = () => (
  <div>
    <h2>About</h2>
    <p>フレンズに投票するページです</p>
  </div>
)
const Friends = () => (
  <div>
    <h2>Friends</h2>
    <p>ここにフレンズのリストを書きます</p>
  </div>
)

export default App;
