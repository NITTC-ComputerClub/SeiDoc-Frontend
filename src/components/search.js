import React from 'react'
import axios from "axios"
import { withRouter } from 'react-router-dom'

import SubCategoryList from './subCategoryList'
import Collapsible from './collapsible'
import Indicator from './indicator'

class Search extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '',
            indicator: false
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
                "医療",
                "育児",
            ],
        },
        {
            "categry": "建築",
            "subCategry": [
                "サンプル"
            ],
        }, {
            "categry": "病気",
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

    changeIndicator = (value) => {
        this.setState({ indicator: value })
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
                        this.props.changeTitle(text)
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
            list.push(
                <Collapsible key={key.categry} category={key.categry} changeCategory={this.props.changeCategory} changeTitle={this.props.changeTitle} changeIndicator={this.changeIndicator}>
                    <SubCategoryList subCategry={key.subCategry} changeCategory={this.props.changeCategory} changeTitle={this.props.changeTitle} changeIndicator={this.changeIndicator} />
                </Collapsible>
            )
        })
        if (this.state.indicator) {
            return (
                <Indicator />
            )
        }
        else {
            return (
                <div className="fullscreen">
                    <div className="searchBox">
                        <input type="text" value={this.state.value} onChange={this.handleInput.bind(this)} />
                        <button onClick={this.send.bind(this)}>SEND</button>
                    </div>
                    <div id="categoryList">
                        {list}
                    </div>
                </div>
            )
        }
    }
}

export default withRouter(Search)
