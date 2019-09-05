import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import Header from '../components/header'
import Footer from '../../components/footer'

type historyProps = RouteComponentProps;

const ViewingStatus: React.FC<historyProps> = props => {
    return (
        <div>
            <Header />

            <Footer />
        </div>
    )
}

export default withRouter<historyProps, React.FC<historyProps>>(ViewingStatus)