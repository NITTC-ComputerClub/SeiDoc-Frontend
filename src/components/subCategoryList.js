import React, { Component } from 'react';

class subCategoryList extends Component {

    render() {
        const list = []
        this.props.subCategry.forEach(key => {
            list.push(
                <li key={key}>{key}</li>
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
export default subCategoryList;
