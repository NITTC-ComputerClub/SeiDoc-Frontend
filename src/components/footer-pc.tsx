import * as React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import setting from './setting'

const StyledFooter = styled.footer`
    padding: 24px 0;
    background-color: ${setting.White};
`

const Contents = styled.div`
    text-align: center;
`

const Wrapper = styled.div`
    display: inline-block;
    img {
        height: 32px;
    }
`

const StyledLink = styled.div`
    display: inline-block;

    padding: 0 32px;
    position: relative;
    top: -8px;

    p {
        display: inline-block;
        margin: 0 8px;
        font-size: $P3;
    }
`

const Footer: React.FC = () => {
    return (
        <StyledFooter>
            <Contents>
                <Wrapper>
                    <Link to="/">
                        <img src="/img/logo.png" alt="SeiDocのロゴ"></img>
                    </Link>
                </Wrapper>
                {/* 今はリンクなし */}
                <StyledLink>
                    <p>GitHub</p>
                    <p>このサイトについて</p>
                </StyledLink>
            </Contents>
        </StyledFooter>
    )
}

export default Footer