import * as React from 'react'
import { useDispatch } from 'react-redux'
import { fetchSystemByCategory, addTagsCreator } from '../actions/action'

const CategoryButton: React.FC = () => {
    const dispatch = useDispatch()
    const categorySearch = (category: string) => dispatch(fetchSystemByCategory(category))
    const addTags = (newTag: string) => dispatch(addTagsCreator(newTag))
    const categoryList: Array<string> = [
        '子育て', '介護', '建築', '病気', '融資', '地域', '高齢者'
    ]
    return (
        <div>
            <div>
                <div>
                    {categoryList.map((category) => (
                        <button key={category} onClick={() => {
                            categorySearch(category)
                            addTags(category)
                        }}>{category}</button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CategoryButton