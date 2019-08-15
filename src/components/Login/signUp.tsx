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
    console.log(cityData["愛知県"])
    console.log(municipalityData["豊田市"])
    const [loginData, setLoginData] = useState<loginData>({ email: '', password: '' })
    const [city, setCity] = useState<Array<string>>([''])
    const [municipality, setMunicipality] = useState<Array<string>>(['']) 
    const userData = useSelector((state: AppState) => state.userState)
    const dispatch = useDispatch()
    const login = (data: UserState) => dispatch(loginCreator(data))

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

    const handleCityAddressChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const location = cityData[e.target.value] as Array<string>
        setCity(location)
    }

    const handleMunicipalityAddressChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const location = municipalityData[e.target.value] as Array<string>
        if ( typeof location === 'undefined') {
            setMunicipality([''])
        } else {
            setMunicipality(location)
        }
    }

    const handleFullAddressInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        console.log('')
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
            <p>年収</p>
            {/* <input type="number" name="income" onChange={e => handleUserdataInputChange(e)}></input> */}
            <select name="income" value="" onChange={e => handleUserdataInputChange(e)}>
                <option value="">選択してください</option>
                <option value="200万円未満">200万円未満</option>
                <option value="200~400万円">200~400万円</option>
                <option value="400~600万円">400~600万円</option>
                <option value="600~800万円">600~800万円</option>
                <option value="800~1000万円">800~1000万円</option>
                <option value="1000万円以上">1000万円以上</option>
            </select>
            <p>居住区</p>
            {/* <input type="text" name="address" onChange={e => handleUserdataInputChange(e)}></input> */}
            <select name="prefecturesAddress" value="" onChange={e => handleCityAddressChange(e)}>
                <option value="">選択してください</option>
                <option value="愛知県">愛知県</option>
                <option value="岐阜県">岐阜県</option>
                <option value="三重県">三重県</option>
            </select>
            <select name="cityAddress" value="" onChange={e => handleMunicipalityAddressChange(e)}>
                <option value="">選択してください</option>
                {city.map((cityName) => (
                    <option key={cityName} value={cityName}>{cityName}</option>
                ))}
            </select>
            <select name="municipalityAddress" value="" onChange={e => handleFullAddressInputChange(e)}>
                <option value="">選択してください</option>
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