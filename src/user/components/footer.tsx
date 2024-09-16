import * as React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import setting from '../../designSystem/setting'

const StyledFooter = styled.footer`
    width: 100%;
    height: 128px;
    padding: 40px 0;
    background-color: ${setting.White}

    position: absolute;
    bottom: 0;
    box-sizing: border-box;

    .wrapper {
        text-align: center;

        img {
            height: 32px;
        }
    }

    .link {
        text-align: center;
        margin-top: 16px;

        a {
            display: inline-block;
            margin: 0 8px;
            text-decoration: none;
            font-size: ${setting.P1};
            color: ${setting.TextGray}
        }
    }
`

const Footer: React.FC = () => {
    return (
        <StyledFooter>
            <div className="wrapper">
                <Link to="/">
                    <img src="/img/logo.png" alt="SeiDocのロゴ"></img>
                </Link>
            </div>
            <div className="link">
                <a href="https://github.com/NITTC-ComputerClub/SeiDoc">GitHub</a>
            </div>
        </StyledFooter>
    )
}

export default Footer