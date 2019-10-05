import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from '../../store'
import { deleteSystemsCreator, addTagCreator, fetchSystemByAlgoliaSearch } from '../../actions/action'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import ComparisonSystemList from '../components/comparisonSystemList'
import { withRouter, RouteComponentProps } from 'react-router'
import { parse } from 'query-string'
import { tabsType } from '../../types/type'
import '../../../node_modules/react-tabs/style/react-tabs.css'

interface propsType extends RouteComponentProps {
    region: string
}

const ComparisonTabs: React.FC<propsType> = (props) => {
    const systems = useSelector((state: AppState) => state.systemsState.systems)
    const dispatch = useDispatch()
    const [region, setRegion] = useState<string>(props.region)
    const [tabs, setTabs] = useState<Array<tabsType>>([
        { title: region, content: <ComparisonSystemList region={region} systems={systems} /> },
        { title: '+', content: <TabsButton setRegion={setRegion} /> }
    ])

    const addTabs = (tab: number) => {
        console.log('selected:', tab)
        /*
        if (index === tabs.length - 1) {
            tabs.splice(tabs.length - 1, 0, { title: tabs.length.toString(), content: <TabsTop /> })
            console.log('tabs:', tabs)
            setTabs([...tabs])
        }
        */
    }

    useEffect(() => {   //componentDidMount
        console.log('componentDidMount')
        const tag = parse(props.location.search).tag as string
        const inputValue = parse(props.location.search).value as string
        console.log('tag=', tag, 'region=', region, 'inputValue', inputValue)

        const alogliaSearch = (query: string, category: string, region: string) => dispatch(fetchSystemByAlgoliaSearch(query, category, region))
        const addTag = (newtag: string) => dispatch(addTagCreator(newtag))
        const deleteSystems = () => dispatch(deleteSystemsCreator())
        if (tag === undefined && inputValue === undefined && region === undefined) {
            deleteSystems()
        } else {
            alogliaSearch(inputValue, tag, region)
            if (tag !== undefined) {
                addTag(tag)
            }
        }
    }, [region, dispatch, props.location.search])

    useEffect(() => {   //tabsを変更
        console.log('update Systems')
        tabs.splice(tabs.length - 2, 1, { title: region, content: <ComparisonSystemList region={region} systems={systems} /> })
        setTabs(tabs => [...tabs])
    }, [systems, region])

    return (
        <div>
            <Tabs onSelect={addTabs}>
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
    setRegion: React.Dispatch<React.SetStateAction<string>>
}

const TabsButton: React.FC<tabsButtonType> = (props) => {
    return (
        <div>
            <button onClick={() => { props.setRegion('愛知県名古屋市') }}>愛知県名古屋市</button>
            <button onClick={() => { props.setRegion('愛知県小牧市') }}>愛知県小牧市</button>
        </div>
    )
}
