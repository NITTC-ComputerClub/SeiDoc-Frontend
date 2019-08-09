import React, { useState } from 'react'
import { fireStore, auth } from '../../firebase/firebase'
import firebase from 'firebase'

type userData = {
    birthday: string,
    income: number,
    address: string,
    family: string
}

const UserData: React.FC = () => {
    let [userData, setUserData] = useState<userData>({ birthday: '', income: 0, address: '', family: '' })

    const handleSignOut = () => {
        auth.signOut()
    }

    const handleUserdataInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name as 'birthday' | 'address' | 'family'
        userData[name] = e.target.value
        setUserData(Object.assign({}, userData))
    }

    const handleSetUserdata = () => {
        const user = auth.currentUser as firebase.User
        fireStore.collection('user').doc(user.uid).set(userData).then(res => {
            console.log(user.uid)
        })
    }

    return (
        <div>
            {//<div>ようこそ、{auth.currentUser.uid}</div>
            }
            <input type="submit" name="submit" value="SignOut" onClick={() => handleSignOut()}></input>

            <div>生年月日</div>
            <input type="date" name="birthday" value={userData.birthday} onChange={e => handleUserdataInputChange(e)}></input>
            <div>年収</div>
            <input type="number" name="income" value={userData.income} onChange={e => handleUserdataInputChange(e)}></input>
            <div>居住区</div>
            <input type="text" name="address" value={userData.address} onChange={e => handleUserdataInputChange(e)}></input>
            <div>家族構成</div>
            <input type="text" name="family" value={userData.family} onChange={e => handleUserdataInputChange(e)}></input>
            <input type="submit" name="submit" value="submit" onClick={() => handleSetUserdata()}></input>
        </div>
    )
}


export default UserData