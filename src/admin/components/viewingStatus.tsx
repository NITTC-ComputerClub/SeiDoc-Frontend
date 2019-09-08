import React from 'react';

import { useSelector } from 'react-redux';
import { AppState } from '../../store';
import { ageGroup } from '../../types/type';
import styled from 'styled-components';
import setting from '../../designSystem/setting';

type GridProps = {
    gap?: boolean
}

type PProps = {
    center?: boolean
}

const compare = (a: ageGroup, b: ageGroup) => {
    if (a.count > b.count) {
      return -1;
    } else {
      return 1;
    }
};

const getGap = (props: GridProps) => {
    if (props.gap) {
        return `grid-gap: 2px;`
    }
}

const getTextAlign = (props: PProps) => {
    if (props.center) {
        return ` text-align: center`;
    }
}

const Grid = styled.div`
    overflow: hidden;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    ${(props: GridProps) => getGap(props)}
    background-color: ${setting.White};
    border-radius: 4px;
`

const GridTop = styled.div`
    grid-column: 1 / 4;
    background-color: ${setting.ThemeGreen};
`

const ViewTile = styled.div`
    h3 {
        background-color: ${setting.ThemeGreen};
        margin: 0;
        padding: 8px 16px;
        font-weight: lighter;
        font-size: ${setting.H2};
        ${(props: PProps) => getTextAlign(props)};
    }

    p {
        margin: 0;
        padding: 8px 16px;
        text-align: center;
    }
`

const ViewingStatus: React.FC<{documentId: string}> = props => {
    let detail = useSelector((state: AppState) => state.detailState.detail)
    const isSystemLoaded = () => {
        // Nameだけでよさそう
        if ((detail.Name !== "") && (detail.Detail !== "") && (detail.Department !== "")) {
            detail.ageGroup.sort(compare);
            return true
        } else {
            return false
        }
    }
    
    if (isSystemLoaded()) {
        return (
            <div>
                <h2>閲覧状況</h2>
                <Grid gap>
                    <ViewTile center>
                        <h3>今週の閲覧数</h3>
                        <p>{detail.weeklyView.reduce((previous,current) => previous=+current)}</p>
                    </ViewTile>
                    <ViewTile center>
                        <h3>今月の閲覧数</h3>
                        <p>{detail.monthlyView}</p>
                    </ViewTile>
                    <ViewTile center>
                        <h3>総閲覧数</h3>
                        <p>{detail.totalView}</p>
                    </ViewTile>
                    {detail.ageGroup.length === 0 ? 
                        <div /> 
                        :
                            <GridTop>
                                <Grid>
                                    <GridTop>
                                        <ViewTile>
                                            <h3>よく閲覧している層</h3>
                                        </ViewTile>
                                    </GridTop>
                                    {detail.ageGroup.map((d,i) => (
                                        <ViewTile key={i}>
                                            <p>{i+1}位: {d.age}代</p>
                                        </ViewTile>
                                    ))}
                                </Grid>
                            </GridTop>
                    }
                </Grid>
            </div>
        )
    } else{
        return (
          <div>not loaded</div> 
        )
    }
    
}

export default ViewingStatus