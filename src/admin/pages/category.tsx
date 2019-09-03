import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

import Header from '../components/header'
import Footer from '../../components/footer-pc'
import CategoryButton from '../../components/categoryButton'
type historyProps = RouteComponentProps;

const Search: React.FC<historyProps> = props => {
    return(
        <div>
            <Header />
            <div>
                <h2>カテゴリ</h2>
                <CategoryButton pushTo="/admin/search"/>
            </div>
            <Footer />
        </div>
    )
}

export default withRouter<historyProps, React.FC<historyProps>>(Search)