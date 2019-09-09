import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import SystemCard from './systemCard';
import Grid from '../../designSystem/Grid';

type historyProps = RouteComponentProps

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