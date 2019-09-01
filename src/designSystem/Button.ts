import setting from './setting'
import styled from 'styled-components';

export type ButtonProps = {
    big?: boolean,
    blue?: boolean,
    green?: boolean
    maxwidth?: string
}

const Button = styled.button`
    border: none;
    border-radius: 4px;

    ${(props: ButtonProps) => getMaxWidth(props)}
    ${(props: ButtonProps) => getPadding(props)}
    ${(props: ButtonProps) => getTextAlign(props)}
    ${(props: ButtonProps) => getFont(props)}
    ${(props: ButtonProps) => getColor(props)}
    ${(props: ButtonProps) => getBackgroundColor(props)}
`

const getMaxWidth = (props: ButtonProps) => {
    if (props.maxwidth)
        return `max-width: ${props.maxwidth};`
}

const getFont = (props: ButtonProps) => {
    if (props.big)
        return `font-size: ${setting.H1}; font-weight: bold;`

    return `font-size: ${setting.P2}; font-weight: normal`
}

const getTextAlign = (props: ButtonProps) => {
    if (props.big)
        return `text-align: left;`

    return `text-align: center;`
}

const getPadding = (props: ButtonProps) => {
    if (props.big)
        return `padding: 16px;`

    return `padding: 8px 16px;`
}

const getColor = (props: ButtonProps) => {
    if (props.blue || props.green)
        return `color: ${setting.White};`

    return `color: ${setting.TextBlack};`
}

const getBackgroundColor = (props: ButtonProps) => {
    if (props.blue) 
        return `background-color: ${setting.ThemeBlue};`

    if (props.green)
        return `background-color: ${setting.ThemeGreen};`

    return `background-color: ${setting.White};`
}

export default Button