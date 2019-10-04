import React, { useState } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import { tabsType } from '../../types/type'
import '../../../node_modules/react-tabs/style/react-tabs.css'

const ComparisonTabs: React.FC = () => {
    const [tabs, setTabs] = useState<Array<tabsType>>([{ title: '+', content: <TabsTop /> }])

    const addTabs = (index: number) => {
        console.log('selected:', index)
        console.log('tabs length:', tabs.length)
        if (index === tabs.length - 1) {
            tabs.splice(tabs.length - 1, 0, { title: tabs.length.toString(), content: <TabsTop /> })
            console.log('tabs:', tabs)
            setTabs([...tabs])
        }
    }

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

export default ComparisonTabs

const TabsTop: React.FC = () => {
    return (
        <div>
            <p>できた</p>
        </div>
    )
}
