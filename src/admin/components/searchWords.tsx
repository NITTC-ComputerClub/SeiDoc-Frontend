import React, { useState } from 'react'
import { fireStore, searchLogIndex } from '../../firebase/firebase'
import Indicator from '../../user/components/indicator'
import { searchLogType } from '../../types/type'
import styled from 'styled-components';
import setting from '../../designSystem/setting';

const Word = styled.p`
    display: inline-block;
    background-color: ${setting.White}
    border-radius: 4px;
    padding: 4px 8px
    margin: 0;
    height: 28px
    vertical-align: middle;
    margin-left: 4px;
`

const SearchWords: React.FC = () => {
    const [searchData, setSearchData] = useState<searchLogType[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const searchDataArray: searchLogType[] = []

    if (searchData.length === 0) {
        fireStore.collection(searchLogIndex).orderBy("createdAt", "desc").limit(15).get()
        .then(
            (snapshot) => {
                snapshot.forEach((doc) => {
                    const data = doc.data() as searchLogType
                    if(data.searchWord !== ''){
                       searchDataArray.push(doc.data() as searchLogType)
                   }
                })
            }
        ).then(
            () => {
                setSearchData(searchDataArray)
                setIsLoading(true)
            }
        )
    }
    console.log(searchData)

    return isLoading ? (
        <div>
            {searchData.map((query: searchLogType) => (
                <Word>{query.searchWord}</Word>
            ))}
        </div>
    ) : (
        <Indicator />
    )
}

export default SearchWords