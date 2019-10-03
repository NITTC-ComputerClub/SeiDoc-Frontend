import React from 'react';
import RegionButton from '../components/regionButton'
import Header from '../components/header'
import Footer from '../components/footer'
import { Wrapper } from '../../designSystem/Page';


const Region: React.FC = () => {
    return (
        <Wrapper>
            <Header />
            <p>地域の選択</p>
            <RegionButton />
            <Footer />
        </Wrapper>
    )
}

export default Region