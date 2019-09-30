import React from 'react'
import Indicator from '../indicator'
import styled from 'styled-components';

const ShowImage = styled.div`
    position: relative;
`
type propsType = {
    isLoading: boolean
}

const Picture: React.FC<propsType> = (props) => {
    return (
        <ShowImage id='showImage'>
            <canvas id='cvs' width='350' height='400' style={{ visibility: props.isLoading ? 'hidden' : 'visible' }}></canvas>
            {props.isLoading ? <Indicator /> : <p></p>}
        </ShowImage>
    )
}

export default Picture