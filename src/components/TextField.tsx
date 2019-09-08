import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import InputField, { InputFieldProps } from '../designSystem/InputField'
import styled from 'styled-components'
import _ from 'lodash'

type historyProps = RouteComponentProps
type params = {
    label?: string;
}

type Props = historyProps & InputFieldProps & params & React.InputHTMLAttributes<HTMLInputElement>

const StyledLabel = styled.label`
    display: block;
    margin-top: 16px;
`

const TextField: React.FC<Props> = (props) => {
    type TextFieldProps = Omit<Props, keyof historyProps>

    const textFieldProps: TextFieldProps = _.omit(props, ['history', 'location', 'match', 'staticContext']);
    console.log(textFieldProps);

    if (textFieldProps.label) {
        return (
            <div>
                <StyledLabel>{textFieldProps.label}</StyledLabel>
                <InputField {...textFieldProps}></InputField>
            </div>
        )
    }

    return (
            <InputField {...textFieldProps}></InputField>
    )
}

export default withRouter<Props, React.FC<Props>>(TextField)