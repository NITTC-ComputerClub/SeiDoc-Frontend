import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import { useDispatch } from 'react-redux'
import { fetchSystemToComparison } from '../../actions/action'
import Button from '../../designSystem/Button'

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
                category !== undefined || query !== undefined ?
                    <Button blue wide key={region} onClick={() => addComparsion(query, category, region)}>{region}</Button> :
                    <Button blue wide key={region} onClick={() => props.history.push('./category?region=' + region)}>{region}</Button>
            ))}
        </div>
    )

}
export default withRouter<historyProps, React.FC<historyProps>>(RegionButton)