import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import Button from '../../../designSystem/Button'
import styled from 'styled-components'
import setting from '../../../designSystem/setting'

type historyProps = RouteComponentProps

const StyledFinish = styled.div`
    text-align: center;

    img {
        width: 80px;
    }

    p {
        font-size: ${setting.P1};
        color: ${setting.ThemeGreen};
    }
`

const Finish: React.FC<historyProps> = (props) => {
    return (
        <StyledFinish>
            <img src="/img/Finish.png" alt="登録完了"></img>
            <p>登録が完了しました!</p>
            <Button blue wide onClick={() => props.history.push('/')}>始める</Button>
        </StyledFinish>
    )
}

export default withRouter<historyProps, React.FC<historyProps>>(Finish)