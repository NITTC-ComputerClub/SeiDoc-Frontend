import React from 'react';
import { Wrapper, Container, MainContents } from '../../designSystem/Page';
import AdminHeader from '../components/header';
import AdminFooter from '../../user/components/footer-pc';
import UserHeader from '../../user/components/header'
import UserFooter from '../../user/components/footer'
import { useSelector } from 'react-redux';
import { AppState } from '../../store';
import styled from 'styled-components';
import setting from '../../designSystem/setting';

const StyledNotFound = styled.div`
    background-color: ${setting.White};
    padding: 32px;
    text-align: center;

    img {
        max-width: 480px;
        width: 90%;
    }
`

const NotFound: React.FC = () => {
    const user = useSelector((state: AppState) => state.userState)

    if(user.isAdmin){
        return (
            <Wrapper>
                <AdminHeader />
                    <StyledNotFound>
                        <MainContents>
                            <img src="/img/NotFound.png" alt="NotFound"></img>
                        </MainContents>
                    </StyledNotFound>
                <AdminFooter />
           </Wrapper> 
        )
    } else {
        return (
            <Wrapper>
                <UserHeader />
                <StyledNotFound>
                    <MainContents>
                        <img src="/img/NotFound.png" alt="NotFound"></img>
                    </MainContents>
                </StyledNotFound>
                <UserFooter />
            </Wrapper>
        )
    }
}

export default NotFound