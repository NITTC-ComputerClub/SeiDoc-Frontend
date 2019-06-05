import React, { Component } from 'react';
import axios from "axios";

class Api extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };
    }

    componentDidMount() {
        let headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'https://salty-garden-55595.herokuapp.com/ping'
        }
        axios
            .get('https://salty-garden-55595.herokuapp.com/ping',headers)
            .then(results => {
                console.log(results);
            })
            .catch(() => {
                console.log('通信に失敗しました。');
            });
    }

    render() {
        if (this.state.loading) {
            return (
                <div className="App-header">
                    <p>{this.state.data}</p>
                </div>
            );
        } else {
            return (
                <div className="App-header">
                    <p>Loading...</p>
                </div>
            );
        }
    }
}

export default Api;
