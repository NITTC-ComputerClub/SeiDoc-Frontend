import React from 'react'
import Indicator from '../indicator'
import styled from 'styled-components';

const ShowImage = styled.div`
    position: relative;
`

const Canvas = styled.canvas`
    width: 100%;
`

type propsType = {
    select: boolean,
    isLoading: boolean
}

/*
const getCanvasStyle = (select: boolean, isLoading: boolean): React.CSSProperties => {
    if (select) {
        if (isLoading) {
            return {
                display: 'none'
            }
        }
        return {
            display: 'inline'
        }
    } else {
        return {
            height: '0'
        }
    }
}
*/

const Picture: React.FC<propsType> = (props) => {
    return (
        <ShowImage id='showImage'>
            <Canvas id='cvs' width='350' height='400' ></Canvas>
            {props.isLoading ? <Indicator /> : <p></p>}
        </ShowImage>
    )
}

export default Picture