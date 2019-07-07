import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
        }
    }

    send_detail = (data) => {
        this.props.changeDetail(data)
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
        const list = []
        console.log(this.props.category)
        if (this.props.category.length === 0) {
            list.push(<p key="false">検索結果がありません</p>)
        }
        else {
            this.props.category.forEach(key => {
                list.push(
                    <li key={key.name} onClick={() => this.send_detail(key)}>
                        <h4>{key.name}</h4>
                        <p>{key.location}</p>
                    </li>
                )
            })
        }
        console.log(list)
        return (
            <div className="fullscreen">
                <div className="searchBox">
                    <input type="text" value={this.state.value} onChange={this.handleInput.bind(this)} />
                    <button onClick={this.send.bind(this)}>
                        <img src="img/search.png" alt="虫眼鏡"></img>
                    </button>
                </div>
                <h3 id="resultTitle">「{this.props.title}」に関する検索結果</h3>
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
