import setting from './setting'
import styled from 'styled-components';

export type InputFieldProps = {
    width?: string,
}

const getMaxWidth = (props: InputFieldProps) => {
    if (props.width)
        return `width: ${props.width};`
}

const InputField = styled.input`
    box-sizing: border-box;
    padding: 12px 8px;

    border: solid 2px ${setting.Gray5};
    border-radius: 4px;

    font-size: ${setting.P1};

    ${(props: InputFieldProps) => getMaxWidth(props)}
`

export default InputField