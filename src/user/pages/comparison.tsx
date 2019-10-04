import React from 'react'
import Header from '../components/header'
import ComparsionTabs from '../components/comparisonTabs'
import Footer from '../components/footer'
import { Wrapper } from '../../designSystem/Page'

const Detail: React.FC = () => {
    return (
        <Wrapper>
            <Header />
            <ComparsionTabs />
            <Footer />
        </Wrapper>
    )
}

export default Detail