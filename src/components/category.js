import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'

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
                    <p>{this.props.category[i].name}</p>
                    <p>{this.props.category[i].location}</p>
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

export default withRouter(Category);
