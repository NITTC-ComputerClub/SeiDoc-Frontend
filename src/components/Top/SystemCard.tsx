import React from 'react'
import { useDispatch } from 'react-redux'
import { updateDetailCreator } from '../../actions/action'
import { withRouter, RouteComponentProps } from 'react-router'
import { System } from '../../types/type';
import styled from 'styled-components';
import setting from '../../designSystem/setting';

export type params = {
    system: System
}

type SystemCardProps = {
    wide?: boolean
}

type historyProps = RouteComponentProps
type propsType = historyProps & params & SystemCardProps

const StyledSystemCard = styled.li`
    ${(props: SystemCardProps) => getSystemCardStyle(props)}
`

const SystemTitle = styled.h4`
    margin: 0 0 8px 0;
    font-size: $H2;
`

const SystemRegion = styled.p`
    margin: 0;
    font-size: ${setting.P1};
`

const getSystemCardStyle = (props: SystemCardProps) => {
    if (props.wide) {
        return `
            padding: 16px;

            list-style-type: none;
            background-color: ${setting.White};

            border-bottom: solid 2px ${setting.TextBlack};
        `
    }

    return `
        padding: 16px;
        margin-right: 8px;
        width: 240px;

        background-color: ${setting.White};
        border-radius: 4px;

        display: inline-block;
    `
}

const SystemCard: React.FC<propsType> = (props) => {
    const dispatch = useDispatch()
    const updateDetail = (data: System) => dispatch(updateDetailCreator(data))

    return (
        <StyledSystemCard {...props} onClick={() => {
            updateDetail(props.system)
            props.history.push('/detail/' + props.system.documentID)
        }}>
            <SystemTitle>{props.system.Name}</SystemTitle>
            <SystemRegion>{props.system.Location}</SystemRegion>
        </StyledSystemCard>
    )
}

export default withRouter<propsType, React.FC<propsType>>(SystemCard)