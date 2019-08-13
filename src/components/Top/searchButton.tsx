import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import "../../scss/searchButton.scss"

type historyProps = RouteComponentProps
type params = {
    buttonName: string,
    nextLocation: string,
    buttonColor: string
}
type propsType = historyProps & params 

const SearchButton: React.FC<propsType> = (props) => {
    return (
        <div className="searchButton">
            <button 
                style={{backgroundColor: props.buttonColor}}
                onClick={() => {
                    props.history.push(props.nextLocation)
            }}>{ props.buttonName }</button>
        </div>
    )
}

export default withRouter<propsType, React.FC<propsType>>(SearchButton)