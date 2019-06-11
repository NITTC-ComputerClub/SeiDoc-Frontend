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
        }
        this.category = [{
            "categry": "介護",
            "subCategry": [
                "高専",
                "介護",
                "サンプル",
            ],
        },
        {
            "categry": "子育て",
            "subCategry": [
                "出産",
                "病気",
                "育児",
            ],
        },
        {
            "categry": "建築",
            "subCategry": [
                "テスト",
                "ガン",
            ],
        }]
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
        const list = []
        this.category.forEach(key => {
            const sublist = []
            key.subCategry.forEach(subCategry => {
                sublist.push(<li key={subCategry} onClick={() => this.handle_requests(subCategry)}>{subCategry}</li>)
            })
            list.push(<Collapsible key={key.categry} trigger={key.categry}>{sublist}</Collapsible>)
        })
        return (
            <div>
                <input type="text" value={this.state.value} onChange={this.handleInput.bind(this)} />
                <button onClick={this.send.bind(this)}>SEND</button>
                <h1>カテゴリ</h1>
                <div>
                    {list}
                </div>
            </div>
        )
    }
}

export default withRouter(Search);
