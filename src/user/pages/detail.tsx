import React from 'react';
import DetailList from '../components/detailList'
import Header from '../pages/header'
import Footer from '../components/footer'
import { RouteComponentProps } from 'react-router'
import "../../scss/detail.scss"

type historyProps = RouteComponentProps<{documentId: string}>

const Detail: React.FC<historyProps> = (props: historyProps) => {
    const documentId = props.match.params.documentId
    return (
        <div>
            <Header />
            <DetailList documentId={documentId}/>
            <Footer />
        </div>
    )
}

export default Detail