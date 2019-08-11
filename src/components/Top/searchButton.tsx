import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'

type historyProps = RouteComponentProps
type params = {
    buttonName: string,
    nextLocation: string
}
type propsType = historyProps & params 

const SearchButton: React.FC<propsType> = (props) => {
    return (
        <div>
            <button onClick={() => {
                props.history.push(props.nextLocation)
            }}>{ props.buttonName }</button>
        </div>
    )
}

export default withRouter<propsType, React.FC<propsType>>(SearchButton)