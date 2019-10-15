import React from 'react'
import { useSelector } from 'react-redux'
import { AppState } from '../../store'
import SystemList from '../components/systemList'
import Footer from '../components/footer';
import Header from '../components/header'
import '../../scss/result.scss'
import { Wrapper } from '../../designSystem/Page';

const MoreDetails: React.FC = () => {
    const tag = useSelector((state: AppState) => state.tagState.tag)

    return (
        <Wrapper>
            <Header />
            <p>{tag}</p>
            <SystemList />
            <Footer />
        </Wrapper>
    )
}

export default MoreDetails