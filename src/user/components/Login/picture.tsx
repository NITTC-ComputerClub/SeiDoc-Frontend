import React from 'react'
import Indicator from '../indicator'
import styled from 'styled-components';

const ShowImage = styled.div`
    position: relative;
    height: 0;
`

const Canvas = styled.canvas`
    width: 100%;
`

const IndicatorWrapper = styled.div`
    position: absolute;
    top: -150px;
    left: 50%;
    transform: translateX(-50%);
`

type propsType = {
    select: boolean,
    isLoading: boolean
}

const Picture: React.FC<propsType> = (props) => {
    return (
        <ShowImage id='showImage' style={{display: props.select ? 'inline' : 'none'}}>
            <Canvas id='cvs' width='350' height='400' ></Canvas>
            {props.isLoading ? <IndicatorWrapper><Indicator /></IndicatorWrapper> : <p></p>}
        </ShowImage>
    )
}

export default Picture