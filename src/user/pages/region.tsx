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

const WhiteBoard = styled.div`
    overflow: hidden;
    background-color: ${setting.White};
    padding-bottom: 32px;
    margin-bottom: 8px;
`

const Region: React.FC = () => {
    return (
        <Wrapper>
            <Header />
            <WhiteBoard>
                <Container>
                    <MainContents>
                        <Title>地域の選択</Title>
                    </MainContents>
                </Container>
                <RegionButton />
            </WhiteBoard>
            <Footer />
        </Wrapper>
    )
}

export default Region