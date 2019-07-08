import React, { Component } from 'react';

class Detail extends Component {
    render() {
        console.log(this.props.detail)
        return (
            <div className="fullscreen" id="systemDetail">
                <h1>{this.props.detail.name}</h1>
                <h2>対象地区</h2>
                <p>{this.props.detail.location}</p>
                <h2>担当部署</h2>
                <p>{this.props.detail.departmentInCharge}</p>
                <h2>おまかな制度対象者</h2>
                <p>{this.props.detail.Target}</p>
                <h2>内容</h2>
                <p id="systemDescription">{this.props.detail.detail}</p>
                <a target="_blank" rel="noopener noreferrer" href={this.props.detail.site}>
                    <button>公式のページへ</button>
                </a>
            </div>
        )
    }
}

export default Detail;
