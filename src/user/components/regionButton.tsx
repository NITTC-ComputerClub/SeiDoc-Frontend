import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'

interface historyProps extends RouteComponentProps {
    category?: string,
    query?: string,
    algoliaSearch?: (category: string, query: string, region: string) => void
}

type comparisonProps = {
    category: string,
    query: string,
    algoliaSearch: (category: string, query: string, region: string) => void
}

type propsType = historyProps & comparisonProps

const RegionButton: React.FC<historyProps> = (props) => {
    const regionMap = ['愛知県名古屋市', '愛知県小牧市']
    const { category, query, algoliaSearch } = props as propsType

    return (
        <div>
            {regionMap.map((region) => (
                category ?
                    <button key={region} onClick={() => algoliaSearch(category, query, region)}>{region}</button> :
                    <button key={region} onClick={() => props.history.push('./category?region=' + region)}>{region}</button>
            ))}
        </div>
    )

}
export default withRouter<historyProps, React.FC<historyProps>>(RegionButton)