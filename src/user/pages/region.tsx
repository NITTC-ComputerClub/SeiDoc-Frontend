import React from 'react';
import RegionButton from '../components/regionButton'
import Header from '../components/header'
import Footer from '../components/footer'
import { Wrapper, MainContents, Container } from '../../designSystem/Page';
import styled from 'styled-components';
import setting from '../../designSystem/setting';

const Title = styled.h1`
    font-size: ${setting.H1};
`

const Region: React.FC = () => {
    return (
        <Wrapper>
            <Header />
            <Container>
                <MainContents>
                    <h1>地域の選択</h1>
                </MainContents>
            </Container>
            <RegionButton />
            <Footer />
        </Wrapper>
    )
}

export default Region