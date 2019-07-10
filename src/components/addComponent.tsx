import * as React from 'react'
import { TestState } from '../reducers/reducer'
import { NumActions } from '../containers/addContainer'


type hogeProps = TestState & NumActions

export const AddComponent: React.SFC<hogeProps> = props => {
    return (
        <div>
            <div>
                {props.num}
            </div>
            {console.log(props)}
            <div>
                <button onClick={props.updateNum}>+1する</button>
            </div>
            <div>
                <button onClick={props.init}>初期化</button>
            </div>
            <div>
                <button onClick={() => props.setNum(5)}>5にする</button>
            </div>
        </div>
    )
}