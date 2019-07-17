import * as React from 'react'
import { SystemsState } from '../reducers/categorysReducer'
import { CategorysActions } from '../containers/categorysContainer'

type categoryProps = SystemsState & CategorysActions

const CategoryButton: React.FC<categoryProps> = (props: categoryProps) => {
    return (
        <div>
            <div>
                {console.log(props)}
                <button onClick={props.fetchSystem}>子育て</button>
            </div>
        </div>
    )
}

export default CategoryButton