import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from '../../store'
import { addTagCreator, fetchSystemToComparison } from '../../actions/action'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import RegionButton from '../components/regionButton'
import ComparisonSystemList from '../components/comparisonSystemList'
import { withRouter, RouteComponentProps } from 'react-router'
import { parse } from 'query-string'
import { tabsType } from '../../types/type'
import '../../../node_modules/react-tabs/style/react-tabs.css'

type historyProps = RouteComponentProps

const ComparisonTabs: React.FC<historyProps> = (props) => {
    const tabsState = useSelector((state: AppState) => state.tabsState)
    console.log('tabsState:', tabsState)

    const category = parse(props.location.search).tag as string
    const query = parse(props.location.search).value as string
    const dispatch = useDispatch()

    const [tabs, setTabs] = useState<Array<tabsType>>([
        { title: '+', content: <RegionButton category={category} query={query} /> }
    ])

    useEffect(() => {
        const region = parse(props.location.search).region as string
        const regionArray = region.split(',')
        const addTag = (newtag: string) => dispatch(addTagCreator(newtag))
        const addComparsion = (query: string, category: string, region: string) => dispatch(fetchSystemToComparison(query, category, region))
        regionArray.forEach((region => {
            addComparsion(query, category, region)
        }))
        category !== undefined && addTag(category)
    }, [dispatch, category, query, props])

    useEffect(() => {
        const data: Array<tabsType> = []
        tabsState.forEach((value) => {
            data.push({ title: value.region, content: <ComparisonSystemList region={value.region} systems={value.systems} /> })
        })
        data.push({ title: '+', content: <RegionButton category={category} query={query} /> })
        setTabs(data)
    }, [tabsState, category, query])

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

export default withRouter<historyProps, React.FC<historyProps>>(ComparisonTabs)