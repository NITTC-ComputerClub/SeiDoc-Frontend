import React, { useState, useEffect, useCallback } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import ComparisonSystemList from '../components/comparisonSystemList'
import { withRouter, RouteComponentProps } from 'react-router'
import { parse } from 'query-string'
import { tabsType, System } from '../../types/type'
import algoliasearch from 'algoliasearch'
import { algoliaSearchIndex } from '../../firebase/firebase'
import { getSystemDataByFireStore } from '../../actions/action'
import '../../../node_modules/react-tabs/style/react-tabs.css'

interface propsType extends RouteComponentProps {
    region: string
}

type tabsDataType = {
    region: string,
    systems: Array<System>
}

const ComparisonTabs: React.FC<propsType> = (props) => {
    const algoliaSearch = useCallback((region: string) => {
        const category = parse(props.location.search).tag as string
        const query = parse(props.location.search).value as string
        console.log('query=', query, 'category=', category, 'region=', region)
        const client = algoliasearch('XW5SXYAQX9', '81fe6c5ab81e766f4ec390f474dde5b9')
        const index = client.initIndex(algoliaSearchIndex)
        let algoliaSearchData: Array<System>
        index.search({
            query: query ? query : ' ',
        }).then(res => {
            algoliaSearchData = res.hits as Array<System>
            console.log('res.hits', algoliaSearchData)
            if (region !== undefined) {
                algoliaSearchData = algoliaSearchData.filter(s => (s.Location === region)).map(s => s)
            }
            if (category !== undefined) {
                algoliaSearchData = algoliaSearchData.filter(s => s.Category.includes(category)).map(s => s)
            }
            console.log('result:', algoliaSearchData)
        }).then(() => {
            const system: Array<System> = []
            getSystemDataByFireStore(algoliaSearchData).then(snapshot => {
                snapshot.forEach(s =>
                    system.push(s.data() as System)
                )
            }).then(() => {
                const newData = [{ region: region, systems: system }]
                setTabsData(prev => prev.concat(newData))
                //updateTabs(tabsData)
            })
        }).catch(err => console.error("error at algoliasearch", err))
    }, [props.location.search])

    const [tabsData, setTabsData] = useState<Array<tabsDataType>>([])
    const [tabs, setTabs] = useState<Array<tabsType>>([
        { title: '+', content: <TabsButton algoliaSearch={algoliaSearch} /> }
    ])

    useEffect(() => {
        algoliaSearch(props.region)
    }, [props, algoliaSearch, setTabsData])

    useEffect(() => {
        const data: Array<tabsType> = []
        console.log('CH', tabsData)
        tabsData.forEach((value) => {
            data.push({ title: value.region, content: <ComparisonSystemList region={value.region} systems={value.systems} /> })
        })
        data.push({ title: '+', content: <TabsButton algoliaSearch={algoliaSearch} /> })
        console.log(data)
        setTabs(data)
    }, [tabsData, algoliaSearch])

    return (
        <div>
            <Tabs>
                <TabList>
                    {tabs.map((tab) => (
                        <Tab key={tab.title}>{tab.title}</Tab>
                    ))}
                </TabList>
                {tabs.map((tab) => (
                    <TabPanel key={tab.title}>{tab.content}</TabPanel>
                ))}
            </Tabs>
        </div>
    )
}

export default withRouter<propsType, React.FC<propsType>>(ComparisonTabs)

type tabsButtonType = {
    algoliaSearch: (region: string) => void
}

const TabsButton: React.FC<tabsButtonType> = (props) => {
    return (
        <div>
            <button onClick={() => props.algoliaSearch('愛知県名古屋市')}>愛知県名古屋市</button>
            <button onClick={() => props.algoliaSearch('愛知県小牧市')}>愛知県小牧市</button>
        </div>
    )
}
