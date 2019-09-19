import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import Header from '../components/header'
import Footer from '../../user/components/footer'
import SystemRankingList from '../components/systemRankingList'
import { Container, MainContents } from '../../designSystem/Page';
import styled from 'styled-components';
import setting from '../../designSystem/setting';

type historyProps = RouteComponentProps;

const Title = styled.h1`
    font-size: ${setting.H1};
`

const Label = styled.h1`
    font-size: ${setting.H3};
`

const Select = styled.select`
    height: 32px;
    width: 104px;
    background-color: ${setting.White};
    border-radius: 2px;
`

const Status: React.FC<historyProps> = props => {
    const categoryList: Array<string> = [
        '子育て', '介護', '建築', '病気', '融資', '地域', '高齢者'
    ]
    return (
        <div>
            <Header ranking />
                <Container>
                    <MainContents>
                        <Title>ランキング</Title>
                        <Label>カテゴリ</Label>
                        <Select>
                            <option key='すべて'>すべて</option>
                            {categoryList.map((category) => (
                                <option key={category}>{category}</option>
                            ))}
                        </Select>
                        <SystemRankingList />
                    </MainContents>
                </Container>
            <Footer />
        </div>
    )
}

export default withRouter<historyProps, React.FC<historyProps>>(Status)