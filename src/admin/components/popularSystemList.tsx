import React from 'react'
import PopularSystemCard from './popularSystemCard'

const AdminPopularSystemList: React.FC = () => {
    return (
        <div>
            {/* 決め打ちマン */}
            <PopularSystemCard
                systemName="出産育児一時金直接支払い制度"
                view={563}
                group="30代女性"
            />
            <PopularSystemCard
                systemName="出産育児一時金直接支払い制度"
                view={563}
                group="30代女性"
            />
            <PopularSystemCard
                systemName="出産育児一時金直接支払い制度"
                view={563}
                group="30代女性"
            />
            <PopularSystemCard
                systemName="出産育児一時金直接支払い制度"
                view={563}
                group="30代女性"
            />
        </div>
    )
}

export default AdminPopularSystemList