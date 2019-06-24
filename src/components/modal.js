import React, { Fragment } from 'react'
import Hello from './Hello'
import { fail } from 'assert';

class Collapsible extends React.Component {
    category = [{
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
    }]

    ref = React.createRef()     //Helloをimport

    componentDidMount() {
        //Helloを非表示
        this.ref.current.style.height = '0px'
    }

    toggleCollapse = () => {
        if (this.ref.current.style.height !== '0px') {
            this.ref.current.style.height = '0px'
        } else {
            this.ref.current.style.height = `${this.ref.current.scrollHeight}px`
        }
    }

    render() {
        const list = []
        this.category.forEach(key => {
            console.log(React.createRef())
            list.push(
                <Fragment>
                    <li>{key.categry}<button onClick={this.toggleCollapse}>toggle</button></li>
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
        })
        return (
            <div>
                {list}
            </div>
        )
    }
}

class Modal extends React.Component {
    render() {
        return (
            <div>
                <Collapsible>
                    <Hello />
                </Collapsible>
            </div>
        )
    }
}

export default Modal
