import * as React from 'react'
import { Link } from 'react-router-dom'
import '../scss/header.scss'

const Header: React.FC = () => {
    return (
        <header>
            <div className="wrapper">
                <Link to="/">
                    <img src="/img/logo.png" alt="SeiDocのロゴ"></img>
                </Link>
            </div>
            {/* 今はリンクなし */}
            <div className="link">
                <p>GitHub</p>
                <p>このサイトについて</p>
            </div>
        </header>
    )
}

export default Header