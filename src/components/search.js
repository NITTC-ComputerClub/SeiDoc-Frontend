import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import Collapsible from 'react-collapsible';
import axios from "axios";
import './desgin.css'

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
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
            .get(url + text, headers)
            .then(
                (results) => {
                    console.log(results.data)
                    if (results.data != null) {
                        this.props.changeCategory(results.data)
                        this.props.history.push('/category')
                    }
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
        this.handle_requests(value)
        this.setState({
            value: '',
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
                            <li onClick={() => this.handle_requests('高専')}>高専</li>
                            <li onClick={() => this.handle_requests('介護')}>介護</li>
                            <li onClick={() => this.handle_requests('介護')}>介護</li>
                        </ul>
                    </Collapsible>
                    <Collapsible trigger="子育て">
                        <ul>
                            <li onClick={() => this.handle_requests('出産')}>出産</li>
                            <li onClick={() => this.handle_requests('病気')}>病気</li>
                            <li onClick={() => this.handle_requests('育児')}>育児</li>
                        </ul>
                    </Collapsible>
                    <Collapsible trigger="建築">
                        <ul>
                            <li onClick={() => this.handle_requests('出産')}>出産</li>
                            <li onClick={() => this.handle_requests('病気')}>病気</li>
                            <li onClick={() => this.handle_requests('育児')}>育児</li>
                        </ul>
                    </Collapsible>
                    <Collapsible trigger="医療">
                        <ul>
                            <li onClick={() => this.handle_requests('出産')}>出産</li>
                            <li onClick={() => this.handle_requests('病気')}>病気</li>
                            <li onClick={() => this.handle_requests('育児')}>育児</li>
                        </ul>
                    </Collapsible>
                </div>
            </div>
        )
    }
}

export default withRouter(Search);
