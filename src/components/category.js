import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
        }
    }

    send_detail = () => {
        this.props.history.push('/detail')
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
        });
    }

    render() {
        let list = []
        for (let i = 0; i < this.props.category.length; i++) {
            list.push(
                <li key={this.props.category[i].name} onClick={this.send_detail}>
                    <h4>{this.props.category[i].name}</h4>
                    <p>{this.props.category[i].location}</p>
                </li>
            )
        }
        console.log(list)
        return (
            <div className="fullscreen">
                <div className="searchBox">
                    <input type="text" value={this.state.value} onChange={this.handleInput.bind(this)} />
                    <button onClick={this.send.bind(this)}>SEND</button>
                </div>
                <h3 id="resultTitle">「{this.props.category[0].category}」に関する検索結果</h3>
                <div>
                    <ul id="systemList">
                        {list}
                    </ul>

                </div>
            </div>
        )
    }
}

export default withRouter(Category);
