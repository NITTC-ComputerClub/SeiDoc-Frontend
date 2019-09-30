import React from 'react';
import { Wrapper } from '../../designSystem/Page';
import AdminHeader from '../components/header';
import AdminFooter from '../../user/components/footer-pc';
import UserHeader from '../../user/components/header'
import UserFooter from '../../user/components/footer'
import { useSelector } from 'react-redux';
import { AppState } from '../../store';


const NotFound: React.FC = () => {
    const user = useSelector((state: AppState) => state.userState)

    if(user.isAdmin){
        return (
            <Wrapper>
                <AdminHeader />
                    <div>
                        <p>404</p>
                        <p>Not Found</p>
                        <p>お探しのページは見つかりませんでした。</p>
                    </div>
                <AdminFooter />
           </Wrapper> 
        )
    } else {
        return (
            <Wrapper>
                <UserHeader />
                    <div>
                        <p>404</p>
                        <p>Not Found</p>
                        <p>お探しのページは見つかりませんでした。</p>
                    </div>
                <UserFooter />
            </Wrapper>
        )
    }
}

export default NotFound