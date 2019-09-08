import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import styled from 'styled-components';
import setting from '../designSystem/setting';

interface GridProps {
    pc?: boolean,
    sp?: boolean
}

interface historyProps extends RouteComponentProps, GridProps {
    pushTo: string
}

const StyledCategoryCard = styled.button`
    padding: 0;
    background-color: ${setting.White};

    border-radius: 4px 4px 4px 4px;
    border: none;
    box-shadow: 1px 1px 4px ${setting.TextGray};

    img {
        width: 100%;
    }

    .categoryName {
        padding: 4px 0;

        font-size: ${setting.H2};
        font-weight: bold;

        color: ${setting.TextBlack};
    }
`

const Grid = styled.div`
    display: grid;
    grid-gap: 16px;
    grid-template-columns: repeat(auto-fill, minmax(144px, 1fr));
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