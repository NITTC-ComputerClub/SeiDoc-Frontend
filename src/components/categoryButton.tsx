import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import '../scss/categoryButton.scss'

type historyProps = RouteComponentProps

const CategoryButton: React.FC<historyProps> = (props) => {
    const categoryList: Array<string> = [
        '子育て', '介護', '建築', '病気', '融資', '地域', '高齢者'
    ]
    return (
        <div className="categoryButtonList">
            {categoryList.map((category) => (
                <div key={category} className="categoryButton">
                    <button key={category} onClick={() => {
                        props.history.push('/search?tag=' + category)
                    }}>
                        <img src={"./img/" + category + ".png"} alt={category + "の写真"}></img>
                        <div className="categoryName">
                            {category}
                        </div>
                    </button>
                </div>
            ))}
        </div>
    )
}

export default withRouter<historyProps, React.FC<historyProps>>(CategoryButton)