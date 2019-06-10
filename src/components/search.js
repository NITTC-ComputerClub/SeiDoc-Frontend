import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import Collapsible from 'react-collapsible';
import axios from "axios";

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

    handle_requests = () => {
        let headers = {
            'Content-Type': 'application/json'
        }
        axios
            .get('https://golang-with-dbserver.herokuapp.com/ping', headers)
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
                <ul>
                    <li>
                        <Link to='/api'>介護</Link>
                    </li>
                </ul>
                <div>
                    <Collapsible trigger="Start here">
                        <p>This is the collapsible content. It can be any element or React component you like.</p>
                        <p>It can even be another Collapsible component. Check out the next section!</p>
                    </Collapsible>
                </div>
            </div>
        )
    }
}

export default Search;
