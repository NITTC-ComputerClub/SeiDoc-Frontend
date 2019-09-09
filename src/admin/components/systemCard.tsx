import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import styled from 'styled-components';
import _ from 'lodash';
import { FaEye } from 'react-icons/fa'
import setting from '../../designSystem/setting';

interface historyProps extends RouteComponentProps, React.HTMLAttributes<HTMLDivElement> {
    ranking?: number,
    systemName: string,
    view: number,
    department: string,
}

const Ranking = styled.h2`
    font-size: ${setting.H2};
`

const StyledSystemCard = styled.div`
    overflow: hidden;
    background-color: ${setting.White};
    border-radius: 4px;
    position: relative;
    padding: 8px 16px;
`

const SystemName = styled.div`
    font-size: ${setting.H2};
    font-weight: bold;
    margin: 8px 0;
`

const Department = styled.p`
    font-size: ${setting.H3};
    margin: 8px 0;
`

const View = styled.p`
    position: absolute;
    margin: 0;
    top: 8px;
    right: 16px;
    font-size: ${setting.P1};

    .icon {
        margin-right: 8px;
        font-size: ${setting.P2};
    }
`

const SystemCard: React.FC<historyProps> = props => {
    const systemCardProps = _.omit(props, ['history', 'location', 'match', 'staticContext'])

    if (props.ranking) {
        return (
            <div {...systemCardProps}>
                <Ranking>{systemCardProps.ranking}位</Ranking>
                <StyledSystemCard>
                    <SystemName>{systemCardProps.systemName}</SystemName>
                    <View>
                        <FaEye className="icon" color={setting.TextGray} />
                        {systemCardProps.view}
                    </View>
                    <Department>{systemCardProps.department}</Department>
                </StyledSystemCard>
            </div>
        )
    }

    return (
        <div {...systemCardProps}>
            <StyledSystemCard>
                <SystemName>{systemCardProps.systemName}</SystemName>
                <View>
                    <FaEye className="icon" color={setting.TextGray} />
                    {systemCardProps.view}
                </View>
                <Department>{systemCardProps.department}</Department>
            </StyledSystemCard>
        </div>
    )
}

export default withRouter<historyProps, React.FC<historyProps>>(SystemCard)