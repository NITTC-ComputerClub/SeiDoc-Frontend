import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import InputField, { InputFieldProps } from '../designSystem/InputField'
import styled from 'styled-components';

type historyProps = RouteComponentProps
type params = {
    label?: string;
}

type TextFieldProps = historyProps & InputFieldProps & params & React.InputHTMLAttributes<HTMLInputElement>

const StyledLabel = styled.label`
    display: block;
    margin-top: 16px;
`

const TextField: React.FC<TextFieldProps> = (props) => {
    if (props.label) {
        return (
            <div>
                <StyledLabel>{props.label}</StyledLabel>
                <InputField {...props}></InputField>
            </div>
        )
    }

    return (
            <InputField {...props}></InputField>
    )
}

export default withRouter<TextFieldProps, React.FC<TextFieldProps>>(TextField)