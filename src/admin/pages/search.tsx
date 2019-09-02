import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

import Header from '../components/header'
import Footer from '../../components/footer-pc'
type historyProps = RouteComponentProps;

const Search: React.FC<historyProps> = props => {
    return(
        <div>
            <Header />
            <div>aaa</div>
            <Footer />
        </div>
    )
}

export default withRouter<historyProps, React.FC<historyProps>>(Search)