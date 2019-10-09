import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loginCreator } from '../../../actions/action'
import { AppState } from '../../../store'
import { fireStore, auth } from '../../../firebase/firebase'
import firebase from 'firebase'
import { withRouter, RouteComponentProps } from 'react-router'
import { Link } from 'react-router-dom'
import '../../../scss/signUp.scss'
import { signInDataType, locationDataType, birthdayDataType, UserState } from '../../../types/type';
import Button from '../../../designSystem/Button';

type historyProps = RouteComponentProps

const cityData = require('../../../datas/cityData.json')
const municipalityData = require('../../../datas/municipalityData.json')

const SignUp: React.FC<historyProps> = (props) => {
    const [signInData, setSignInData] = useState<signInDataType>({ email: { data: '', message: null, status: false }, password: { data: '', message: null, status: false }, secondPassword: { data: '', message: null, status: false } })
    const [cityArray, setCityArray] = useState<Array<string>>(['選択してください'])
    const [municipalityArray, setMunicipalityArray] = useState<Array<string>>([''])
    const [locationData, setLocationData] = useState<locationDataType>({ prefecture: '', city: '', municipality: '' })
    const [birthdayData, setBirthdayData] = useState<birthdayDataType>({ year: '', month: '', date: '' })
    const userData = useSelector((state: AppState) => state.userState)
    const dispatch = useDispatch()
    const login = (data: UserState) => dispatch(loginCreator(data))
    const [nickName, setNickName] = useState<string>('')

    const handleSignUp = () => {
        const email = signInData.email
        const password = signInData.password

        const birthday = ('000' + birthdayData.year).slice(-4) + '-' + ('0' + birthdayData.month).slice(-2) + '-' + ('0' + birthdayData.date).slice(-2)
        const address = locationData.prefecture + locationData.city + locationData.municipality
        userData['birthday'] = birthday
        userData['address'] = address
        userData['nickName'] = nickName
        userData.isAdmin = false;
        userData.department = 'None';
        userData.family = []
        userData.targetFamily = -1

        console.log("登録")

        // auth.createUserWithEmailAndPassword(email.data, password.data).then(res => {
        //     const user = res.user as firebase.User
        //     userData['userId'] = user.uid
        // }).then(() => {
        //     console.log('userData:', userData)
        //     login(userData)
        //     props.history.push('/picture')
        //     handleFirebaseSetUserdata()
        // }).catch((error) => {
        //     const errorCode = error.code
        //     const errorMessage = error.message
        //     if (errorCode === 'auth/weak-password') {
        //         alert('The password is too weak.')
        //         props.history.push('/signup')
        //     } else {
        //         alert(errorMessage)
        //         props.history.push('/signup')
        //     }
        //     console.log(error)
        // })
    }


    const handleLoginDataInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const type = e.target.name as 'email' | 'password' | 'secondPassword'
        switch (type) {
            case 'email':
                signInData.email.data = e.target.value
                if (e.target.validationMessage) {
                    signInData.email.message = e.target.validationMessage
                    signInData.email.status = false
                } else {
                    signInData.email.message = null
                    signInData.email.status = true
                }
                break
            case 'password':
                signInData.password.data = e.target.value
                if (signInData.password.data.length < 8 || signInData.password.data.length >= 16) {
                    signInData.password.message = 'パスワードは8文字以上16文字以下にしてください'
                    signInData.password.status = false
                } else if (!/^([a-zA-Z0-9])+$/.test(signInData.password.data)) {
                    signInData.password.message = 'パスワードには半角英数字のみが使用できます'
                    signInData.password.status = false
                } else {
                    signInData.password.message = null
                    signInData.password.status = true
                }
                break
            case 'secondPassword':
                signInData.secondPassword.data = e.target.value
                if (signInData.password.data !== signInData.secondPassword.data) {
                    signInData.secondPassword.message = 'パスワードと一致していません'
                    signInData.secondPassword.status = false
                } else {
                    signInData.secondPassword.message = null
                    signInData.secondPassword.status = true
                }
                break
        }
        setSignInData(Object.assign({}, signInData))
    }

    const handleUserdataInputChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const type = e.target.name as 'nickName' | 'income'
        switch(type) {
            case 'nickName':
                setNickName(e.target.value)
                break
            case 'income' :
                userData[type] = e.target.value
                break
        }
        // userData[name] = e.target.value
        // console.log(userData.nickName.length)
    }

    const handleAddressChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const name = e.target.name as 'prefecture' | 'city' | 'municipality'
        locationData[name] = e.target.value
        setLocationData(Object.assign({}, locationData))
        if (name === 'prefecture') {
            const location = cityData[e.target.value] as Array<string>
            setCityArray(location)
            setMunicipalityArray([''])
        } else if (name === 'city') {
            const location = municipalityData[e.target.value] as Array<string>
            if (typeof location === 'undefined') {
                setMunicipalityArray([''])
            } else {
                setMunicipalityArray(location)
            }
        }
    }

    const handleBirthdayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const name = e.target.name as 'year' | 'month' | 'date'
        birthdayData[name] = e.target.value
        setBirthdayData(Object.assign({}, birthdayData))
    }

    const birthdayInputLoop = (start: number, end: number) => {
        const items = []
        items.push(<option key="" value="">選択してください</option>)
        for (let i = start; i < end; i++) {
            items.push(<option key={i} value={i}>{i}</option>)
        }
        return items
    }

    const handleFirebaseSetUserdata = () => {
        const uid = userData.userId
        const sendData = userData
        delete sendData.userId
        fireStore.collection('user').doc(uid).set(sendData).then(res => {
            console.log('set firebase', uid)
        })
    }

    return (
        <div className="signUp">
            <p>メールアドレス</p>
            <input type="email" name="email" value={signInData.email.data} onChange={e => handleLoginDataInputChange(e)} required />
            <p>{signInData.email.message}</p>
            <p>パスワード</p>
            <input type="password" name="password" value={signInData.password.data} onChange={e => handleLoginDataInputChange(e)} required />
            <p>{signInData.password.message}</p>
            <p>パスワードの再入力</p>
            <input type="password" name="secondPassword" value={signInData.secondPassword.data} onChange={e => handleLoginDataInputChange(e)} required />
            <p>{signInData.secondPassword.message}</p>
            <p>ニックネーム</p>
            <input type="text" name="nickName" onChange={e => handleUserdataInputChange(e)} required />
            {/\s/.test(nickName) || nickName.length === 0 ? <p>入力必須項目です</p> : <div></div>}
            <p>生年月日</p>
            <select className="year" name="year" onChange={e => handleBirthdayChange(e)}>
                {birthdayInputLoop(1950, 2020)}
            </select>
            <span>年</span>
            <select className="month" name="month" onChange={e => handleBirthdayChange(e)}>
                {birthdayInputLoop(1, 13)}
            </select>
            <span>月</span>
            <select className="date" name="date" onChange={e => handleBirthdayChange(e)}>
                {birthdayInputLoop(1, 32)}
            </select>
            <span>日</span>
            <p>年収</p>
            <select className="fullWidth" name="income" onChange={e => handleUserdataInputChange(e)}>
                <option value="">選択してください</option>
                <option value="200万円未満">200万円未満</option>
                <option value="200~400万円">200~400万円</option>
                <option value="400~600万円">400~600万円</option>
                <option value="600~800万円">600~800万円</option>
                <option value="800~1000万円">800~1000万円</option>
                <option value="1000万円以上">1000万円以上</option>
            </select>
            <p>居住区</p>
            <select className="fullWidth" name="prefecture" onChange={e => handleAddressChange(e)}>
                <option value="">選択してください</option>
                <option value="愛知県">愛知県</option>
                <option value="岐阜県">岐阜県</option>
                <option value="三重県">三重県</option>
            </select>
            <select className="fullWidth" name="city" onChange={e => handleAddressChange(e)}>
                {cityArray.map((cityName) => (
                    <option key={cityName} value={cityName}>{cityName}</option>
                ))}
            </select>
            {municipalityArray.toString() === '' ?
                <div></div> :
                <select className="fullWidth" name="municipality" onChange={e => handleAddressChange(e)}>
                    {municipalityArray.map((municipalityName) => (
                        <option key={municipalityName} value={municipalityName}>{municipalityName}</option>
                    ))}
                </select>
            }
            <div className="lrContents">
                <Link to='/login'>ログインはこちらから</Link>
                <Button blue disabled={!signInData.email.status || !signInData.password.status || !signInData.secondPassword.status} onClick={() => handleSignUp()}>
                    次へ
                </Button>
            </div>
        </div>
    )
}


export default withRouter<historyProps, React.FC<historyProps>>(SignUp)