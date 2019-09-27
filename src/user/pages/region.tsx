import React from 'react';
import RegionButton from '../components/regionButton'
import Header from '../components/header'
import Footer from '../components/footer'
import { RouteComponentProps } from 'react-router'
import { Wrapper } from '../../designSystem/Page';

type historyProps = RouteComponentProps<{documentId: string}>

const Region: React.FC<historyProps> = (props: historyProps) => {
    //const documentId = props.match.params.documentId
    return (
        <Wrapper>
            <Header />
            <p>地域の選択</p>
            <RegionButton />
            {/*<DetailList documentId={documentId}/>*/}
            <Footer />
        </Wrapper>
    )
}

export default Region