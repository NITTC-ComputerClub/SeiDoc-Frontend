import * as React from 'react'
import '../../scss/ranking.scss'

const Ranking: React.FC = () => {
    return (
        <div className="ranking">
            <ul>
                <li>
                    <i id="yellow">1</i>
                    <p>千葉県印西市</p>
                </li>
                <li>
                    <i id="gray3">2</i>
                    <p>富山県砺波市</p>
                </li>
                <li>
                    <i id="orange">3</i>
                    <p>愛知県長久手市</p>
                </li>
            </ul>
        </div>
    )
}

export default Ranking