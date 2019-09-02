import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { useSelector } from 'react-redux';
import { statement } from '@babel/template';
import { UserState } from '../../types/type';
import { AppState } from '../../store';
import { render } from 'react-dom';
import { Link } from 'react-router-dom';
import "../../scss/header.scss"
import SearchBar from '../../components/searchBar';


type historyProps = RouteComponentProps

const AdminHeader: React.FC<historyProps> = props => {
    const user = useSelector((state: AppState) => state.userState)
    return(
        <header>
            <div>
                <Link to="/">
                    制度一覧
                </Link>
                <Link to="/">
                    新制度登録
                </Link>
            </div>
            <div>
                <Link to="/">
                    制度閲覧状況
                </Link>
            </div>
            <div className="searchBar" >
                <SearchBar />
            </div>
        </header>
    )
}

export default withRouter<historyProps, React.FC<historyProps>>(AdminHeader) 
