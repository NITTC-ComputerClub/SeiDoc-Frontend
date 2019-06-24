import React, { Fragment } from 'react'
import axios from "axios"

import Hello from './Hello'
import Collapsible from './collapsible'

class Modal extends React.Component {
    constructor(props) {
        super(props)
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
                "病気",
                "育児",
            ],
        },
        {
            "categry": "建築",
            "subCategry": [
                "サンプル"
            ],
        },{
            "categry": "医療",
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

    render() {
        const list = []
        this.category.forEach(key => {
            list.push(
                <Collapsible key={key.categry} category={key.categry} changeCategory={this.props.changeCategory}>
                    <Hello subCategry={key.subCategry}/>
                </Collapsible>
            )
        })
        return (
            <div>
                {list}
            </div>
        )
    }
}

export default Modal
