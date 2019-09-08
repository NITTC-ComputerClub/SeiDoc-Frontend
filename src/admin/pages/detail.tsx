import React from 'react';
import { RouteComponentProps } from 'react-router'
import ViewingStatus from '../components/viewingStatus'
import Header from '../components/header'
import Footer from '../../components/footer-pc'
import DetailList from '../components/detailList';
import styled from 'styled-components';

type historyProps = RouteComponentProps<{documentId: string}>

const MainContents = styled.div`
    box-sizing: border-box;
    margin: 0 auto;
    max-width: 960px;
`

const Container = styled.div`
    margin: 0 16px 32px 16px;
`

const Detail: React.FC<historyProps> = (props: historyProps) => {
    const documentId = props.match.params.documentId
    return (
        <div >
            <Header />
            <Container>
                <MainContents>
                    <DetailList documentId={documentId}/>
                    <ViewingStatus documentId={documentId} />
                </MainContents>
            </Container>
            <Footer />
        </div>
    )
}

export default Detail