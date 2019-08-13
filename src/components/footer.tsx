import * as React from 'react'
import { Link } from 'react-router-dom'
import '../scss/footer.scss'

const Footer: React.FC = () => {
    return (
        <footer>
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
        </footer>
    )
}

export default Footer