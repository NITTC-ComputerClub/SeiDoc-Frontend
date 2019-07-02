import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'

class Indicator extends React.Component {
    render() {
        return (
            <div>
                <FontAwesomeIcon icon={faCircleNotch} spin size="6x" />
            </div>
        )
    }
}

export default Indicator
