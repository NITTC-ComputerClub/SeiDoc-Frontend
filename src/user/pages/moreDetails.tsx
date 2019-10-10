import React from 'react'
import SearchBar from '../components/searchBar'
import Tag from '../components/tag'
import SystemList from '../components/systemList'
import ComparisonTabs from '../components/comparisonTabs'
import Footer from '../components/footer';
import Header from '../components/header'
import '../../scss/result.scss'
import { Wrapper } from '../../designSystem/Page';
import { RouteComponentProps } from "react-router";
import { parse } from 'query-string'

const MoreDetails: React.FC<RouteComponentProps> = (props) => {
    return (
        <Wrapper>
            <Header />
            <SystemList />
            <Footer />
        </Wrapper>
    )
}

export default MoreDetails