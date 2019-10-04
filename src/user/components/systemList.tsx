import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from '../../store'
import { deleteSystemsCreator, addTagCreator, fetchSystemByAlgoliaSearch } from '../../actions/action'
import Indicator from './indicator'
import { withRouter, RouteComponentProps } from 'react-router'
import { parse } from 'query-string'
import "../../scss/systemList.scss"
import { System } from '../../types/type';
import SystemCard from './Top/SystemCard';

type historyProps = RouteComponentProps

const SystemList: React.FC<historyProps> = (props) => {
    const tag = parse(props.location.search).tag as string
    const inputValue = parse(props.location.search).value as string
    const region = parse(props.location.search).region as string
    const systems = useSelector((state: AppState) => state.systemsState.systems)
    const loading = useSelector((state: AppState) => state.systemsState.loading)
    const dispatch = useDispatch()
    //データのfetch
    useEffect(() => {
        //const categorySearch = (category: string, region: string) => dispatch(fetchSystemByCategory(category,region))
        const alogliaSearch = (query: string, category: string, region: string) => dispatch(fetchSystemByAlgoliaSearch(query, category, region))
        const addTag = (newtag: string) => dispatch(addTagCreator(newtag))
        const deleteSystems = () => dispatch(deleteSystemsCreator())
        if(tag === undefined && inputValue === undefined && region === undefined){
            deleteSystems()
        }else{
            alogliaSearch(inputValue, tag, region)
            if(tag !== undefined){
                addTag(tag)
            }
        }
    }, [dispatch, tag, inputValue, region])

    return (
        <div className="systemList">
            {console.log('systems:', systems)}
            {loading ? <Indicator /> :
                <ul>
                    {
                        systems.map((system: System) => (
                            <SystemCard
                                wide
                                key={system.Name}
                                system={system}
                            />       
                        ))
                    }
                </ul>
            }
        </div>
    )
}
export default withRouter<historyProps, React.FC<historyProps>>(SystemList)