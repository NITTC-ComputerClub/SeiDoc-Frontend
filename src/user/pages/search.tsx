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

const Search: React.FC<RouteComponentProps> = (props) => {
    const region = parse(props.location.search).region as string

    return (
        <Wrapper>
            <Header />
            <div className="result">
                <div className="container">
                    <SearchBar pushTo="/search" center />
                </div>
                <Tag />
                <h3>検索結果</h3>
                {region ?
                    <ComparisonTabs region={region} /> :
                    <SystemList />
                }
            </div>
            <Footer />
        </Wrapper>
    )
}

export default Search