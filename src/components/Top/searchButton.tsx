import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import Button, { ButtonProps } from '../../designSystem/Button'

type historyProps = RouteComponentProps
type params = {
    nextLocation: string,
}
type propsType = historyProps & params & ButtonProps

const SearchButton: React.FC<propsType> = (props) => {
    return (
        <Button
            big
            maxwidth="160px"
            {...props}
            onClick={() => {
                props.history.push(props.nextLocation)
            }}>{ props.children }
        </Button>
    )
}

export default withRouter<propsType, React.FC<propsType>>(SearchButton)