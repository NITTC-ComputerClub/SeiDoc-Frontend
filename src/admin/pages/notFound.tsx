import React from 'react';
import { Wrapper } from '../../designSystem/Page';
import Header from '../components/header';
import Footer from '../../user/components/footer-pc';


const NotFound: React.FC = () => {
    return(
       <Wrapper>
           <Header />
            <div>
                <p>404</p>
                <p>Not Found</p>
                <p>お探しのページは見つかりませんでした。</p>
            </div>
            <Footer />
           </Wrapper> 
    )
}

export default NotFound