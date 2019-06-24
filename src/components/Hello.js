import React, { Component } from 'react';
import axios from "axios"

class Hello extends Component {
    sample = () => {
        console.log('OK')
    }

    render() {
        return (
            <div>
                <ul>
                    <li>一つ目</li>
                    <li>二つ目</li>
                    <li>三つ目</li>
                </ul>
                <button onClick={this.sample}>あ</button>
            </div>
        );
    }
}
export default Hello;
