import * as React from 'react'
import { State } from '../reducers/systemReducer'
import { SystemActions } from '../containers/systemContainer'

type CH = State & SystemActions
const CategoryButton: React.SFC<CH> = (props: CH) => {
    return (
        <div>
            <div>
                <p>{props.all.loading}</p>
                <p>{props.all.error}</p>
                <button onClick={props.loadAllSystem}>カテゴリー</button>
                {console.log(props)}
            </div>
        </div>
    )
}

export default CategoryButton