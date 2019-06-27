import React, { Component } from 'react'
import axios from "axios"
import { withRouter } from 'react-router-dom'

class subCategoryList extends Component {
    handle_requests = (text) => {
        console.log(text)
        const url = process.env.REACT_APP_URL
        const params = '/category?category='
        const headers = {
            'Content-Type': 'application/json'
        }
        axios
            .get(url + params + text, headers)
            .then(
                (results) => {
                    console.log(results.data)
                    if (results.data !== null) {
                        this.props.changeCategory(results.data)
                        this.props.changeTitle(text)
                        this.props.history.push('/category')
                    }
                },
                (error) => {
                    console.log(error)
                })
    }

    render() {
        const list = []
        this.props.subCategry.forEach(key => {
            list.push(
                <li key={key} onClick={() => this.handle_requests(key)}>{key}</li>
            )
        })
        return (
            <div>
                <ul id="systemList">
                    {list}
                </ul>
            </div>
        );
    }
}
export default withRouter(subCategoryList)
