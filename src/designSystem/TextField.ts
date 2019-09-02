import setting from './setting'
import styled from 'styled-components';

export type TextFieldProps = {
    width?: string,
}

const getMaxWidth = (props: TextFieldProps) => {
    if (props.width)
        return `width: ${props.width};`
}

const TextField = styled.input`
    box-sizing: border-box;
    padding: 12px 8px;

    border: solid 2px ${setting.Gray5};
    border-radius: 4px;

    font-size: ${setting.P1};

    ${(props: TextFieldProps) => getMaxWidth(props)}
`

export default TextField