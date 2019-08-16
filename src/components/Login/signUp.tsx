import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loginCreator } from '../../actions/action'
import { UserState } from '../../reducers/loginReducer'
import { AppState } from '../../store'
import { fireStore, auth } from '../../firebase/firebase'
import firebase from 'firebase'
import { withRouter, RouteComponentProps } from 'react-router'
import { Link } from 'react-router-dom'

type historyProps = RouteComponentProps

type loginData = {
    email: string,
    password: string
}
const cityData = require('../../datas/cityData.json')
const municipalityData = require('../../datas/municipalityData.json')

const SignUp: React.FC<historyProps> = (props) => {
    const [loginData, setLoginData] = useState<loginData>({ email: '', password: '' })
    const [city, setCity] = useState<Array<string>>(['選択してください'])
    const [municipality, setMunicipality] = useState<Array<string>>(['選択してください']) 
    const userData = useSelector((state: AppState) => state.userState)
    const dispatch = useDispatch()
    const login = (data: UserState) => dispatch(loginCreator(data))
    const today = new Date()
    console.log(today)

    const handleSignUp = () => {
        const email = loginData.email
        const password = loginData.password
        console.log(email)
        console.log(password)

        if (password.length < 8) {
            alert('Please enter a password')
            return
        }

        auth.createUserWithEmailAndPassword(email, password).then(res => {
            const user = res.user as firebase.User
            userData['userId'] = user.uid
        }).then(() => {
            login(userData)
            props.history.push('/')
            handleSetUserdata()
        }).catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message
            if (errorCode === 'auth/weak-password') {
                alert('The password is too weak.')
            } else {
                alert(errorMessage)
            }
            console.log(error)
        })
    }

    const handleUserdataInputChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const name = e.target.name as 'birthday' | 'address' | 'family' | 'nickName'
        userData[name] = e.target.value
        console.log('userData', userData)
    }

    const handleSetUserdata = () => {
        const uid = userData.userId
        const sendData = userData
        delete sendData.userId
        fireStore.collection('user').doc(uid).set(sendData).then(res => {
            console.log('set firebase', uid)
        })
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name as 'email' | 'password'
        loginData[name] = e.target.value
        setLoginData(Object.assign({}, loginData))
    }

    const handlePrefecturesAddressChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        
        const location = cityData[e.target.value] as Array<string>
        setCity(location)
    }

    const handleCityAddressChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const location = municipalityData[e.target.value] as Array<string>
        if ( typeof location === 'undefined') {
            setMunicipality(['選択してください'])
        } else {
            setMunicipality(location)
        }
    }

    const handleMunicipalityAddressInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {

    }

    const birthdayInputLoop = (start: number, end: number) => {
        const items = []
        for (let i = start; i < end; i++) {
            items.push(<option value={i}>{i}</option>)
        }
        return items
    }

    return (
        <div>
            <p>メールアドレス</p>
            <input type="text" name="email" onChange={e => handleInputChange(e)}></input>
            <p>パスワード</p>
            <input type="password" name="password" onChange={e => handleInputChange(e)}></input>
            <p>ニックネーム</p>
            <input type="text" name="nickName" onChange={e => handleUserdataInputChange(e)}></input>
            <p>生年月日</p>
            {/* <input type="date" name="birthday" onChange={e => handleUserdataInputChange(e)}></input> */}
            <select name="birthdayYear">
                {birthdayInputLoop(1950, today.getFullYear())}
            </select>
            <select name="birthdayMonth">
                {birthdayInputLoop(1, 12)}
            </select>
            <select name="birthdayDate">
                {birthdayInputLoop(1, 31)}
            </select>
            <p>年収</p>
            <select name="income" onChange={e => handleUserdataInputChange(e)}>
                <option value="選択してください">選択してください</option>
                <option value="200万円未満">200万円未満</option>
                <option value="200~400万円">200~400万円</option>
                <option value="400~600万円">400~600万円</option>
                <option value="600~800万円">600~800万円</option>
                <option value="800~1000万円">800~1000万円</option>
                <option value="1000万円以上">1000万円以上</option>
            </select>
            <p>居住区</p>
            <select name="prefecturesAddress" onChange={e => handlePrefecturesAddressChange(e)}>
                <option value="選択してください">選択してください</option>
                <option value="愛知県">愛知県</option>
                <option value="岐阜県">岐阜県</option>
                <option value="三重県">三重県</option>
            </select>
            <select name="cityAddress" onChange={e => handleCityAddressChange(e)}>
                {city.map((cityName) => (
                    <option key={cityName} value={cityName}>{cityName}</option>
                ))}
            </select>
            <select name="municipalityAddress" onChange={e => handleMunicipalityAddressInputChange(e)}>
                {municipality.map((municipalityName) => (
                    <option key={municipalityName} value={municipalityName}>{municipalityName}</option>
                ))}
            </select>
            <p>家族構成</p>
            <input type="text" name="family" onChange={e => handleUserdataInputChange(e)}></input>
            <button onClick={() => handleSignUp()}>登録</button>
            <Link to='/login'>ログインはこちらから</Link>
        </div>
    )
}


export default withRouter<historyProps, React.FC<historyProps>>(SignUp)