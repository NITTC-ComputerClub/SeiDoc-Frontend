import React from 'react'
import Indicator from '../indicator'
import styled from 'styled-components';
import setting from '../../../designSystem/setting';

const ShowImage = styled.div`
    position: relative;
    margin-top: 48px;
    
    .viewAge, .viewRelationship {
        border: solid 2px ${setting.TextGray};
        border-radius: 2px;
        text-align: center;
    }
`

const Canvas = styled.canvas`
    width: 100%;
`

const IndicatorWrapper = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`

type propsType = {
    select: boolean,
    isLoading: boolean
}

const Picture: React.FC<propsType> = (props) => {
    return (
        <ShowImage id='showImage' style={{ display: props.select ? 'block' : 'none' }}>
            <Canvas id='cvs' width='350' height='400' ></Canvas>
            {props.isLoading ? <IndicatorWrapper><Indicator /></IndicatorWrapper> : <p></p>}
        </ShowImage>
    )
}

export default Picture