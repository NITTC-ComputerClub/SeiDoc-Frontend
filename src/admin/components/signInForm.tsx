import React, { useState } from 'react';
import { withRouter, RouteComponentProps } from "react-router";
import { adminLoginType } from '../../types/type';

type historyProps = RouteComponentProps
const SignInForm: React.FC<historyProps> = (props) => {
    let [adminUserData, setadminUser] = useState<adminLoginType>({cities:'',department:'',email:'',password:''})
    return (
        <div className="signIn">
            <p>ID</p>
            <input type="text" name="ID" value={adminUserData.email} />
            <p>パスワード</p>
            <input type="password" name="password" value={adminUserData.password} />
            <div className="lrContents">
                <button onClick={() => {}}>ログイン</button>
            </div>
        </div>
    )
}

export default withRouter<historyProps, React.FC<historyProps>>(SignInForm)