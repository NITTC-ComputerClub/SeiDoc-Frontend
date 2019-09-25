import React from 'react'
import { useSelector } from 'react-redux'
import { AppState } from '../../store'
import styled from 'styled-components'
import setting from '../../designSystem/setting'

const StyledTag = styled.p`
    display: inline-block;
    margin: 0 0 0 16px;
    color: ${setting.White};
    background-color: ${setting.ThemeBlue};
    padding: 4px 8px;
    border-radius: 4px;
    font-size: ${setting.P2};
`

const Tag: React.FC = () => {
    const tag = useSelector((state: AppState) => state.tagState.tag)
    return (
        <div className="tag">
            {tag === '' ?
                <div></div> :
                <StyledTag>{tag}</StyledTag>}
        </div>
    )
}

export default Tag