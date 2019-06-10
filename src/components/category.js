import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import Collapsible from 'react-collapsible';
import axios from "axios";
import './desgin.css'

class category extends Component {
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
                <h3>--に対する検索結果</h3>
                <div>
                    <ul>
                        <li>
                            <p>紙おむつ支給</p>
                            <p>愛知県名古屋市</p>
                        </li>
                    </ul>

                </div>
            </div>
        )
    }
}

export default category;
