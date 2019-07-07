import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'

class Indicator extends React.Component {
    render() {
        return (
            <div className="fullscreen Indicator">
                <div className="load">
                    <FontAwesomeIcon className="loadIcon" icon={faCircleNotch} spin size="6x" />
                </div>
            </div>
        )
    }
}

export default Indicator
