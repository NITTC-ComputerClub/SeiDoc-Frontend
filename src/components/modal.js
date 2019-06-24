import React, { Fragment } from 'react'
import { render } from 'react-dom'
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
                <button onClick={this.toggleCollapse}>toggle</button>
                <div
                    ref={this.ref}
                    style={{
                        overflow: 'hidden',
                        transition: 'height 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                    }}
                    onClick={this.toggleCollapse}
                >
                    {this.props.children}
                </div>
            </Fragment>
        )
    }
}

class Modal extends React.Component {
    render() {
        return (
            <div>
                <Collapsible initiallyCollapsed>
                    <Hello name="CodeSandbox" />
                    <h2>Start editing to see some magic happen {'\u2728'}</h2>
                </Collapsible>
                <Collapsible>
                    <Hello name="CodeSandbox" />
                    <h2>Start editing to see some magic happen {'\u2728'}</h2>
                </Collapsible>
            </div>
        )
    }
}

export default Modal
