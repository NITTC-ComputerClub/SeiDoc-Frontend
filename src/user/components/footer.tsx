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

        p {
            display: inline-block;
            margin: 0 8px;
            font-size: ${setting.P3};
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
            {/* TODO: 今はリンクなし */}
            <div className="link">
                <p>GitHub</p>
                <p>このサイトについて</p>
            </div>
        </StyledFooter>
    )
}

export default Footer