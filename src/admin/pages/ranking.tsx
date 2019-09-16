import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import Header from '../components/header'
import Footer from '../../user/components/footer'
import CategoryCardsList from '../../user/components/categoryCardsList'

type historyProps = RouteComponentProps

const Ranking: React.FC<historyProps> = props => {
    return (
        <div>
            <Header />
            <CategoryCardsList pushTo='/admin/ranking' />
            <Footer />
        </div>
    )
}

export default withRouter<historyProps, React.FC<historyProps>>(Ranking)