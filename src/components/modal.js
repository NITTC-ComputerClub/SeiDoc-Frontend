import React, { Fragment } from 'react'
import Hello from './Hello'

class Collapsible extends React.Component {
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
        return (
            <Fragment>
                <li>{this.props.category}<button onClick={this.toggleCollapse}>toggle</button></li>
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
    }
}

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
        }]
    }

    render() {
        const list = []
        this.category.forEach(key => {
            list.push(
                <Collapsible key={key.categry} category={key.categry}>
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
