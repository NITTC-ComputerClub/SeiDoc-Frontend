import React from 'react'
import AdminPopularSystemCard from './adminPopularSystemCard'

const AdminPopularSystemList: React.FC = () => {
    return (
        <div>
            {/* 決め打ちマン */}
            <AdminPopularSystemCard
                systemName="出産育児一時金直接支払い制度"
                view={563}
                group="30代女性"
            />
            <AdminPopularSystemCard
                systemName="出産育児一時金直接支払い制度"
                view={563}
                group="30代女性"
            />
            <AdminPopularSystemCard
                systemName="出産育児一時金直接支払い制度"
                view={563}
                group="30代女性"
            />
            <AdminPopularSystemCard
                systemName="出産育児一時金直接支払い制度"
                view={563}
                group="30代女性"
            />
        </div>
    )
}

export default AdminPopularSystemList