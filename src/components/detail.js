import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import Collapsible from 'react-collapsible';
import axios from "axios";
import './desgin.css'

class Detail extends Component {
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
        let list = []
        for (let i = 0; i < this.props.category.length; i++) {
            list.push(
                <li key={this.props.category[i].name}>
                    <p>{this.props.category[i].name}</p>
                    <p>{this.props.category[i].detail}</p>
                </li>
            )
        }
        console.log(list)
        return (
            <div>
                <input type="text" value={this.state.value} onChange={this.handleInput.bind(this)} />
                <button onClick={this.send.bind(this)}>SEND</button>
                <h3>{this.props.category[0].category}に対する検索結果</h3>
                <div>
                    <ul>
                        {list}
                    </ul>

                </div>
            </div>
        )
    }
}

export default Detail;
