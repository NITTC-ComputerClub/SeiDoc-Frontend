import React from 'react';
import DetailList from '../components/detailList'
import Header from '../components/header'
import Footer from '../components/footer'
import { RouteComponentProps } from 'react-router'
import "../../scss/detail.scss"
import { Wrapper } from '../../designSystem/Page';

type historyProps = RouteComponentProps<{documentId: string}>

const Detail: React.FC<historyProps> = (props: historyProps) => {
    const documentId = props.match.params.documentId
    return (
        <Wrapper>
            <Header />
            <DetailList documentId={documentId}/>
            <Footer />
        </Wrapper>
    )
}

export default Detail