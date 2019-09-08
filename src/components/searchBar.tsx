import React from 'react'
import { useSelector } from 'react-redux'
import { AppState } from '../store'
import { withRouter, RouteComponentProps } from 'react-router'
import styled from 'styled-components';
import setting from '../designSystem/setting';

interface historyProps extends RouteComponentProps {
    pushTo: string,
    left?: boolean,
    center?: boolean,
    right?: boolean
}

type SearchBarProps = {
    left?: boolean,
    center?: boolean,
    right?: boolean
}

const StyledSearchBar = styled.div`
    display: inline-block;
    max-width: 420px;
    min-width: 304px;
    height: 48px;
    text-align: center;
    ${(props: SearchBarProps) => getMargin(props)}

    input {
        box-sizing:border-box;
        width: calc(100% - 64px);
        height: 100%;

        border-top: solid 2px ${setting.TextGray};
        border-right: none;
        border-bottom: solid 2px ${setting.TextGray};
        border-left: solid 2px ${setting.TextGray};
        border-radius: 4px 0 0 4px;

        ::focus {
            outline: none;
        }
    }

    button {
        vertical-align: middle;

        box-sizing:border-box;
        height: 100%;
        width: 64px;

        border: none;
        border-radius: 0 4px 4px 0px;

        background-color: ${setting.ThemeGreen};

        img {
            position: relative;
            top: 3px;
            height: 32px;
            padding: 0;
        }
    }
`

const getMargin = (props: SearchBarProps) => {
    if (props.center) {
        return `margin: 0 auto;`
    }

    if (props.left) {
        return `margin: 0 auto 0 0;`
    }

    if (props.right) {
        return `margin: 0 0 0 auto;`
    }
}

const SearchBar: React.FC<historyProps> = (props) => {
    const tag = useSelector((state: AppState) => state.tagState.tag)
    let inputValue: string = ''
    return (
        <StyledSearchBar {...props}>
            <input type="text" onChange={e => {
                inputValue = e.target.value
            }} placeholder="「未熟児」などの単語を入力" />
            <button onClick={() => {
                props.history.push( props.pushTo + '?tag=' + tag + '&value=' + inputValue)
            }}>
                <img src="/img/虫眼鏡.png" alt="虫眼鏡"></img>
            </button>
        </StyledSearchBar>
    )
}

export default withRouter<historyProps, React.FC<historyProps>>(SearchBar)