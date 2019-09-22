import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from '../../../store'
import { loginCreator } from '../../../actions/action'
import drawProfile from './drawProfile'
import { withRouter, RouteComponentProps } from 'react-router'
import { profileDataType, UserState } from '../../../types/type'
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
                        selectRelationship.selectedIndex = i
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
        if (inputAge.value === '') {
            alert('修正したい人の顔写真をタッチしてください\n修正が必要ないときは登録完了を押してください')
            return
        }
        const value: profileDataType = props.profileData[sequence]
        value.age = Number(inputAge.value)
        value.relationship = selectRelationship.value
        if (selectRelationship.value === '夫' || selectRelationship.value === '息子' || selectRelationship.value === '祖父') {
            value.gender = 'Male'
        }
        else if (selectRelationship.value === '妻' || selectRelationship.value === '娘' || selectRelationship.value === '祖母') {
            value.gender = 'Female'
        }

        console.log('new value:', value)
        props.profileData.splice(sequence, 1, value)
        drawProfile(props.profileData)
    }

    const fixData = () => {
        userData.family = [] //データの初期化
        props.profileData.forEach((value) => {
            //家族情報更新
            let sex = 2
            if (value.gender === 'Male') {
                sex = 0
            }
            else if (value.gender === 'Female') {
                sex = 1
            }
            userData.family.push({
                relationship: value.relationship,
                age: value.age,
                gender: sex
            })

            //本人情報更新
            if(value.relationship === '本人') {
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
                <option value='祖父'>祖父</option>
                <option value='祖母'>祖母</option>
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