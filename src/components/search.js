import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import Collapsible from 'react-collapsible';
import axios from "axios";
import './desgin.css'

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            value: '',
            message: ''
        };
        this.handle_requests = this.handle_requests.bind(this)
    }

    handle_requests = (text) => {
        console.log(text)
        const url = 'https://golang-with-dbserver.herokuapp.com/category?category='
        const headers = {
            'Content-Type': 'application/json'
        }
        axios
            .get(url+text, headers)
            .then(
                (results) => {
                    this.setState({
                        loading: true,
                        itmes: results.data
                    })
                    console.log(this.state.itmes)
                },
                (error) => {
                    console.log(error)
                })
    }

    handleInput = ({ target: { value } }) => {
        this.setState({
            value
        });
    }

    send = () => {
        const { value } = this.state;
        console.log(value)
        this.setState({
            value: '',
            message: value
        });
    }

    render() {
        return (
            <div>
                <input type="text" value={this.state.value} onChange={this.handleInput.bind(this)} />
                <button onClick={this.send.bind(this)}>SEND</button>
                <h1>カテゴリ</h1>
                <div>
                    <Collapsible trigger="介護">
                        <ul>
                            <li onClick={() => this.handle_requests('高専')}>介護</li>
                            <li onClick={() => this.handle_requests('介護')}>介護</li>
                            <li onClick={() => this.handle_requests('介護')}>介護</li>
                        </ul>
                    </Collapsible>
                    <Collapsible trigger="子育て">
                        <ul>
                            <li><Link to='/api'>出産</Link></li>
                            <li><Link to='/api'>病気</Link></li>
                            <li><Link to='/api'>育児</Link></li>
                        </ul>
                    </Collapsible>
                    <Collapsible trigger="建築">
                        <ul>
                            <li><Link to='/api'>出産</Link></li>
                            <li><Link to='/api'>病気</Link></li>
                            <li><Link to='/api'>育児</Link></li>
                        </ul>
                    </Collapsible>
                    <Collapsible trigger="医療">
                        <ul>
                            <li><Link to='/api'>出産</Link></li>
                            <li><Link to='/api'>病気</Link></li>
                            <li><Link to='/api'>育児</Link></li>
                        </ul>
                    </Collapsible>
                </div>
            </div>
        )
    }
}

export default Search;
