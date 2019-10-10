import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import { useDispatch } from 'react-redux'
import { fetchSystemToComparison } from '../../actions/action'
import Button from '../../designSystem/Button'

interface historyProps extends RouteComponentProps {
    category?: string,
    query?: string,
    regionList?: Array<string>
}

type comparisonProps = {
    category: string,
    query: string,
    regionList: Array<string>
}

type propsType = historyProps & comparisonProps

const RegionButton: React.FC<historyProps> = (props) => {
    const regionMap = ['愛知県名古屋市', '愛知県小牧市']
    const { category, query, regionList } = props as propsType
    const dispatch = useDispatch()
    const addComparsion = (query: string, category: string, region: string) => dispatch(fetchSystemToComparison(query, category, region))

    const checkValue = (region: string) => {
        if (regionList.includes(region))
            return (<Button gray disabled key={region}>{region}</Button>)
        else
            return (<Button blue wide key={region} onClick={() => addComparsion(query, category, region)}>{region}</Button>)
    }
    return (
        <div>
            {regionMap.map((region) => (
                category !== undefined || query !== undefined ?
                    checkValue(region) :
                    <Button blue wide key={region} onClick={() => props.history.push('./category?region=' + region)}>{region}</Button>
            ))}
        </div>
    )

}
export default withRouter<historyProps, React.FC<historyProps>>(RegionButton)