import React from 'react'
import axios from "axios"
import { withRouter } from 'react-router-dom'

import SubCategoryList from './subCategoryList'
import Collapsible from './collapsible'

class Search extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '',
            message: ''
        }
        this.category = [{
            "categry": "介護",
            "subCategry": [
                "サンプル"
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
                "サンプル"
            ],
        }, {
            "categry": "医療",
            "subCategry": [
                "サンプル"
            ],
        },
        {
            "categry": "融資",
            "subCategry": [
                "サンプル"
            ],
        },
        {
            "categry": "地域",
            "subCategry": [
                "サンプル"
            ],
        },
        {
            "categry": "高齢者",
            "subCategry": [
                "サンプル"
            ],
        }]
    }

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
                        this.props.history.push('/category')
                    }
                    else if(results.data === null){
                        this.setState({
                            value: '',
                            message: '存在しないカテゴリーです'
                        })
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
            list.push(
                <Collapsible key={key.categry} category={key.categry} changeCategory={this.props.changeCategory}>
                    <SubCategoryList subCategry={key.subCategry} />
                </Collapsible>
            )
        })
        return (
            <div className="fullscreen">
                <div className="searchBox">
                    <input type="text" value={this.state.value} onChange={this.handleInput.bind(this)} />
                    <button onClick={this.send.bind(this)}>SEND</button>
                </div>
                <p>{this.state.message}</p>
                <div id="categoryList">
                    {list}
                </div>
            </div>
        )
    }
}

export default withRouter(Search)
