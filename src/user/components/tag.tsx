import React from 'react'
import { useSelector } from 'react-redux'
import { AppState } from '../../store'
import '../../scss/tag.scss'


const Tag: React.FC = () => {
    const tag = useSelector((state: AppState) => state.tagState.tag)
    return (
        <div className="tag">
            {tag === '' ?
                <div></div> :
                <p>{tag}</p>}
        </div>
    )
}

export default Tag