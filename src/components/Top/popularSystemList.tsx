import * as React from 'react'
import PopularSystemCard from './popularSystemCard'
import "../../scss/popularSystemList.scss"

const PopularSystemList: React.FC = () => {
    return(
        <div className="popularSystemList">
            <ul>
                <PopularSystemCard systemName="医療費補助" systemLocation="愛知県名古屋市" />
                <PopularSystemCard systemName="就学援助" systemLocation="愛知県名古屋市" />
                <PopularSystemCard systemName="子ども手当" systemLocation="愛知県名古屋市" />
            </ul>
        </div>
    )
}

export default PopularSystemList