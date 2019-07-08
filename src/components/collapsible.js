import React, { Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import axios from "axios"

class Collapsible extends React.Component {
    ref = React.createRef()     //subCategoryListをimport

    constructor(props) {
        super(props)
        this.state = {
            buttonToggle: false
        }
    }

    componentDidMount() {
        //非表示
        this.ref.current.style.height = '0px'
    }

    toggleCollapse = () => {
        if (this.ref.current.style.height !== '0px') {
            this.setState({
                buttonToggle: false
            })
            this.ref.current.style.height = '0px'
        } else {
            this.setState({
                buttonToggle: true
            })
            this.ref.current.style.height = `${this.ref.current.scrollHeight}px`
        }
    }

    handle_requests = (text) => {
        console.log(text)
        this.props.changeIndicator(true)
        const url = process.env.REACT_APP_URL
        const params = '/institution?query='
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
                        this.props.changeIndicator(false)
                        this.props.history.push('/category')
                    }
                    else if (results.data == null) {
                        this.props.changeIndicator(false)
                    }
                },
                (error) => {
                    console.log(error)
                })
    }

    render() {
        return (
            <Fragment>
                <div id="categoryBar">
                    <li onClick={() => this.handle_requests(this.props.category)}>{this.props.category}</li>
                    <button onClick={this.toggleCollapse}>
                        <div className={this.state.buttonToggle ? "openButton modalIcon" : "closeButton modalIcon"}></div>
                    </button>
                </div>
                <div
                    ref={this.ref}
                    style={{
                        overflow: 'hidden',
                        transition: 'height 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                    }}
                >
                    {this.props.children}
                </div>
            </Fragment>
        )

    }
}

export default withRouter(Collapsible)
