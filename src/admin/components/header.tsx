import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import SearchBar from '../../components/searchBar';


type historyProps = RouteComponentProps

const AdminHeader: React.FC<historyProps> = props => {
    return(
        <header>
            <div>
                <Link to="/">
                    制度一覧
                </Link>
                <Link to="/">
                    新制度登録
                </Link>
                <Link to="/admin/viewingStatus">
                    制度閲覧状況
                </Link>
            </div>
            <div className="searchBar" >
                <SearchBar pushTo="/admin/search" />
            </div>
        </header>
    )
}

export default withRouter<historyProps, React.FC<historyProps>>(AdminHeader) 
