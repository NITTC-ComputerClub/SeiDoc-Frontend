import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import styled from 'styled-components';
import setting from '../../designSystem/setting';

interface GridProps {
    pc?: boolean,
    sp?: boolean
}

interface historyProps extends RouteComponentProps, GridProps {
    pushTo: string
}

const StyledCategoryCard = styled.button`
    border-radius: 4px;
    background-color: ${setting.White};
    border: solid 2px ${setting.TextGray};
    color: ${setting.TextGray};

    img {
        width: 40px;
        margin-top: 8px;
    }

    div {
        font-size: ${setting.H2};
        font-weight: bold;
    }
`

const Grid = styled.div`
    display: grid;
    grid-gap: 8px;
    grid-template-columns: repeat(auto-fill, minmax(128px, 1fr));
    margin-top: 16px;
    margin-bottom: 32px;
`

const CategoryCardsList: React.FC<historyProps> = (props) => {
    const categoryList: Array<string> = [
        '子育て', '介護', '建築', '病気', '融資', '地域', '高齢者'
    ]

    return (
        <Grid>
            {categoryList.map((category) => (
                <StyledCategoryCard key={category} onClick={() => {
                    props.history.push(props.pushTo + '?tag=' + category)
                }}>
                    <img src={"/img/" + category + ".png"} alt={category + "の写真"}></img>
                    <div className="categoryName">
                        {category}
                    </div>
                </StyledCategoryCard>
            ))}
        </Grid>
    )
}

export default withRouter<historyProps, React.FC<historyProps>>(CategoryCardsList)