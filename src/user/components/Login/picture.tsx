import React from 'react'
import styled from 'styled-components';

const ShowImage = styled.div`
    position: relative;
`

const Picture: React.FC = () => {
    return (
        <ShowImage id='showImage'>
            <canvas id='cvs' width='350' height='400'></canvas>
        </ShowImage>
    )
}

export default Picture