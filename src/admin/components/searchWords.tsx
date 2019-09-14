import React, { useState } from 'react'
import { fireStore, searchLogIndex } from '../../firebase/firebase'
import Indicator from '../../user/components/indicator'
import { searchLogType } from '../../types/type'
import { firestore } from 'firebase'

const SearchWords: React.FC = () => {
    const [searchData, setSearchData] = useState<searchLogType[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const searchDataArray: searchLogType[] = []

    if (searchData.length === 0) {
        fireStore.collection(searchLogIndex).orderBy("createdAt", "desc").limit(10).get()
        .then(
            (snapshot) => {
                snapshot.forEach((doc) => {
                    searchDataArray.push(doc.data() as searchLogType)
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
                <p>{query.searchWord}</p>
            ))}
        </div>
    ) : (
        <Indicator />
    )
}

export default SearchWords