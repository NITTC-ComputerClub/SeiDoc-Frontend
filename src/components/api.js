import React, { Component } from 'react';
import axios from "axios";

class Api extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        };
        this.handle_requests = this.handle_requests.bind(this)
    }

    handle_requests(){
        let headers = {
            'Content-Type': 'application/json'
        }
        axios
            .get('https://golang-with-dbserver.herokuapp.com/ping',headers)
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

    render() {
        if (this.state.loading) {
            return (
                <div className="App-header">
                    <p>{this.state.itmes.name}</p>
                    <p>{this.state.itmes.departmentInCharge}</p>
                    <p>{this.state.itmes.site}</p>
                    <p>{this.state.itmes.detail}</p>
                </div>
            );
        } else {
            return (
                <div className="App-header">
                    <p>Loading...</p>
                    <button onClick={this.handle_requests}>requests</button>
                </div>
            );
        }
    }
}

export default Api;
