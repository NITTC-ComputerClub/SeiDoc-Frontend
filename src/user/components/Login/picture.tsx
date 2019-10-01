import React from 'react'
import Indicator from '../indicator'
import styled from 'styled-components';

const ShowImage = styled.div`
    position: relative;
`
type propsType = {
    select: boolean,
    isLoading: boolean
}

const Picture: React.FC<propsType> = (props) => {
    return (
        <ShowImage id='showImage' style={{display: props.select ? 'inline' : 'none'}}>
            <canvas id='cvs' width='350' height='400' style={{display: props.isLoading ? 'none' : 'inline'}}></canvas>
            {props.isLoading ? <Indicator /> : <p></p>}
        </ShowImage>
    )
}

export default Picture