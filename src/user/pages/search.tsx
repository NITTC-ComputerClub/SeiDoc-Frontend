import React from 'react'
import SearchBar from '../components/searchBar'
import Tag from '../components/tag'
import SystemList from '../components/systemList'
import Footer from '../components/footer';
import Header from '../components/header'
import '../../scss/result.scss'
import { Wrapper } from '../../designSystem/Page';

const Search: React.FC = () => {
    return (
        <Wrapper>
            <Header />
            <div className="result">
                <div className="container">
                    <SearchBar pushTo="/search" center/>
                </div>
                <Tag />
                <h3>検索結果</h3>
                <SystemList />
            </div>
            <Footer />
        </Wrapper>
    )
}

export default Search