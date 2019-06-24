import React, { Component } from 'react';
import axios from "axios"

class Hello extends Component {

    render() {
        const list = []
        this.props.subCategry.forEach(key => {
            list.push(
                <li key={key}>{key}</li>
            )
        })
        return (
            <div>
                <ul>
                    {list}
                </ul>
            </div>
        );
    }
}
export default Hello;
