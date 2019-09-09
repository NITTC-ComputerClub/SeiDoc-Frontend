import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import styled from 'styled-components';
import SystemCard from './systemCard';

type historyProps = RouteComponentProps

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 16px;
`

const SystemRankingList: React.FC<historyProps> = props => {
    return (
        <Grid>
            <SystemCard
                ranking={1}
                systemName="私学助成"
                view={1129}
                department="教育委員会事務局教務部学事課就学援助係"
            />
            <SystemCard
                ranking={2}
                systemName="私学助成"
                view={1129}
                department="教育委員会事務局教務部学事課就学援助係"
            />
            <SystemCard
                ranking={3}
                systemName="私学助成"
                view={1129}
                department="教育委員会事務局教務部学事課就学援助係"
            />
            <SystemCard
                ranking={4}
                systemName="私学助成"
                view={1129}
                department="教育委員会事務局教務部学事課就学援助係"
            />
            <SystemCard
                ranking={5}
                systemName="私学助成"
                view={1129}
                department="教育委員会事務局教務部学事課就学援助係"
            />
            <SystemCard
                ranking={6}
                systemName="私学助成"
                view={1129}
                department="教育委員会事務局教務部学事課就学援助係"
            />
            <SystemCard
                ranking={7}
                systemName="私学助成"
                view={1129}
                department="教育委員会事務局教務部学事課就学援助係"
            />
            <SystemCard
                ranking={8}
                systemName="私学助成"
                view={1129}
                department="教育委員会事務局教務部学事課就学援助係"
            />
            <SystemCard
                ranking={9}
                systemName="私学助成"
                view={1129}
                department="教育委員会事務局教務部学事課就学援助係"
            />
            <SystemCard
                ranking={10}
                systemName="私学助成"
                view={1129}
                department="教育委員会事務局教務部学事課就学援助係"
            />
        </Grid>
    )
}

export default withRouter<historyProps, React.FC<historyProps>>(SystemRankingList)