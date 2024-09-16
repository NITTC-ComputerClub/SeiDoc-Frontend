import * as React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import setting from '../../designSystem/setting'

const StyledFooter = styled.footer`
    width: 100%;
    height: 128px;
    padding: 24px 0;
    background-color: ${setting.White};

    position: absolute;
    bottom: 0;
    box-sizing: border-box;
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
    padding: 0 32px;
    position: relative;
    margin-top: 16px;
    top: -8px;

    a {
        font-size: ${setting.P1};
        text-decoration: none;
        color: ${setting.TextGray};
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
                <StyledLink>
                    <a href="https://github.com/NITTC-ComputerClub/SeiDoc">GitHub</a>
                </StyledLink>
            </Contents>
        </StyledFooter>
    )
}

export default Footer