import * as React from 'react'
import PopularSystemCard from './popularSystemCard'

const PopularSystemList: React.FC = () => {
    return(
        <div>
            <ul>
                <PopularSystemCard systemName="医療費補助" systemLocation="愛知県名古屋市" />
                <PopularSystemCard systemName="就学援助" systemLocation="愛知県名古屋市" />
                <PopularSystemCard systemName="子ども手当" systemLocation="愛知県名古屋市" />
            </ul>
        </div>
    )
}

export default PopularSystemList