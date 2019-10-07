import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import { useDispatch } from 'react-redux'
import { fetchSystemToComparison } from '../../actions/action'

interface historyProps extends RouteComponentProps {
    category?: string,
    query?: string,
}

type comparisonProps = {
    category: string,
    query: string,
}

type propsType = historyProps & comparisonProps

const RegionButton: React.FC<historyProps> = (props) => {
    const regionMap = ['愛知県名古屋市', '愛知県小牧市']
    const { category, query } = props as propsType
    const dispatch = useDispatch()
    const addComparsion = (query: string, category: string, region: string) => dispatch(fetchSystemToComparison(query, category, region))

    return (
        <div>
            {regionMap.map((region) => (
                category ?
                    <button key={region} onClick={() => addComparsion(category, query, region)}>{region}</button> :
                    <button key={region} onClick={() => props.history.push('./category?region=' + region)}>{region}</button>
            ))}
        </div>
    )

}
export default withRouter<historyProps, React.FC<historyProps>>(RegionButton)