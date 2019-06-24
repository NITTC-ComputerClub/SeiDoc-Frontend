import React, { Component } from 'react';

class Detail extends Component {
    render() {
        console.log(this.props.detail)
        return (
            <div className="fullscreen" id="systemDetail">
                <h1>{this.props.detail[0].name}</h1>
                <h2>対象地区</h2>
                <p>{this.props.detail[0].location}</p>
                <h2>担当部署</h2>
                <p>{this.props.detail[0].departmentInCharge}</p>
                <h2>おまかな制度対象者</h2>
                <p>{this.props.detail[0].targetAge}歳</p>
                <h2>内容</h2>
                <p>{this.props.detail[0].detail}</p>
                <button>公式のページへ</button>
            </div>
        )
    }
}

export default Detail;
