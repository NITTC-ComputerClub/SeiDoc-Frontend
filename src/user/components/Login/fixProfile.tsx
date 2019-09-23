import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from '../../../store'
import { loginCreator } from '../../../actions/action'
import drawProfile from './drawProfile'
import { withRouter, RouteComponentProps } from 'react-router'
import { profileDataType, UserState, targetSex, targetFamily } from '../../../types/type'
import { fireStore } from '../../../firebase/firebase'

type historyProps = RouteComponentProps

type dataType = {
    profileData: Array<profileDataType>,
}
type propsType = historyProps & dataType

const FixProfile: React.FC<propsType> = (props) => {
    const userData = useSelector((state: AppState) => state.userState)
    const dispatch = useDispatch()
    const login = (data: UserState) => dispatch(loginCreator(data))

    const canvas = document.getElementById('cvs') as HTMLCanvasElement
    const [sequence, setSequence] = useState<number>(0)

    useEffect(() => {
        drawProfile(props.profileData)
    }, [props.profileData])

    const onClick = (e: MouseEvent) => {
        const inputAge = document.getElementById('age') as HTMLInputElement
        const selectRelationship = document.getElementById('relationship') as HTMLSelectElement
        const rect = canvas.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        props.profileData.forEach((element, index) => {
            if (element.boundingBox.left <= x && x <= (element.boundingBox.left + element.boundingBox.width)
                && element.boundingBox.top <= y && y <= (element.boundingBox.top + element.boundingBox.height)) {
                for (let i = 0; i < selectRelationship.length; i++) {
                    if (selectRelationship.options[i].value === element.relationship) {
                        if (element.isPerson) selectRelationship.selectedIndex = 0
                        else selectRelationship.selectedIndex = i
                        inputAge.value = element.age.toString()
                        setSequence(index)
                        break
                    }
                }
            }
        })
    }

    const fetchData = () => {
        const inputAge = document.getElementById('age') as HTMLInputElement
        const selectRelationship = document.getElementById('relationship') as HTMLSelectElement
        if (inputAge.value === '') {    //エラー処理
            alert('修正したい人の顔写真をタッチしてください\n修正が必要ないときは登録完了を押してください')
            return
        }
        const value: profileDataType = props.profileData[sequence]
        value.age = Number(inputAge.value)
        if (selectRelationship.value === '本人') {
            value.isPerson = true
        }
        else {
            value.relationship = selectRelationship.value
            value.isPerson = false
            if (selectRelationship.value === '夫' || selectRelationship.value === '息子' || selectRelationship.value === '父') {
                value.gender = 'Male'
            }
            else if (selectRelationship.value === '妻' || selectRelationship.value === '娘' || selectRelationship.value === '母') {
                value.gender = 'Female'
            }
        }

        console.log('new value:', value)
        props.profileData.splice(sequence, 1, value)
        drawProfile(props.profileData)
    }

    const fixData = () => {
        const husband: boolean = props.profileData.some((value: profileDataType) => { return value.relationship === '夫' })
        const wife: boolean = props.profileData.some((value: profileDataType) => { return value.relationship === '妻' })
        const son: boolean = props.profileData.some((value: profileDataType) => { return value.relationship === '息子' })
        const daughter: boolean = props.profileData.some((value: profileDataType) => { return value.relationship === '娘' })
        const grandfather: boolean = props.profileData.some((value: profileDataType) => { return value.relationship === '父' })
        const grandmother: boolean = props.profileData.some((value: profileDataType) => { return value.relationship === '母' })

        //家族構成を登録
        if (props.profileData.length === 1) {
            userData.targetFamily = targetFamily.独身
        }
        else if (husband && wife) {
            if (props.profileData.length === 2) {
                userData.targetFamily = targetFamily.夫婦
            }
            else if ((son || daughter) && !grandfather && !grandmother) {
                userData.targetFamily = targetFamily.子持ち
            }
            else if (grandfather || grandmother) {
                userData.targetFamily = targetFamily.二世帯
            }
        }
        else if ((husband && !wife) || (!husband && wife)) {
            if (son || daughter) {
                userData.targetFamily = targetFamily.ひとり親
            }
        }

        userData.family = [] //データの初期化
        props.profileData.forEach((value) => {
            //家族情報更新
            let sex = targetSex.other
            if (value.gender === 'Male') {
                sex = targetSex.male
            }
            else if (value.gender === 'Female') {
                sex = targetSex.female
            }
            userData.family.push({
                relationship: value.relationship,
                age: value.age,
                gender: sex
            })

            //本人情報更新
            if (value.relationship === '本人') {
                userData.sex = sex
            }
        })
    }

    const handleFirebaseUpdata = () => {
        fixData() //データ更新
        console.log('userData:', userData)
        const uid = userData.userId
        const sendData = userData
        delete sendData.userId
        fireStore.collection('user').doc(uid).update(sendData).then(res => {
            console.log('updata firebase', uid)
        })
    }

    canvas.addEventListener('click', onClick, false)

    return (
        <div>
            <p>関係</p>
            <select id='relationship' className='fix'>
                <option value='本人'>本人</option>
                <option value='夫'>夫</option>
                <option value='妻'>妻</option>
                <option value='息子'>息子</option>
                <option value='娘'>娘</option>
                <option value='父'>父</option>
                <option value='母'>母</option>
            </select>
            <p>年齢</p>
            <input id='age' type="text" className='fix'></input>
            <button onClick={fetchData}>修正</button>
            <button onClick={() => {
                props.history.push('/finish')
                login(userData)
                handleFirebaseUpdata()
            }}>登録完了</button>
        </div>
    )
}

export default withRouter<propsType, React.FC<propsType>>(FixProfile)