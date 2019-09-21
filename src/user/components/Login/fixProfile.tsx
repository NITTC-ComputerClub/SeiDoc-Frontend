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

        //本人かどうかの判定
        if (selectRelationship.value === '本人') {
            const sex = props.profileData[sequence].gender as "male" | "female" | "other"
            let num = 2
            if (sex === 'male') {
                num = 0
            }
            else if (sex === 'female') {
                num = 1
            }
            userData.sex = num
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
        const grandfather: boolean = props.profileData.some((value: profileDataType) => { return value.relationship === '祖父' })
        const grandmother: boolean = props.profileData.some((value: profileDataType) => { return value.relationship === '祖母' })

        //家族構成を登録
        if (props.profileData.length === 1) {
            userData.family = 0 //'独身'
        }
        else if (husband && wife) {
            if (props.profileData.length === 2) {
                userData.family = 1 //'夫婦'
            }
            else if ((son || daughter) && !grandfather && !grandmother) {
                userData.family = 2 //'子持ち'
            }
            else if (grandfather || grandmother) {
                userData.family = 3 //'2世帯'
            }
        }
        else if ((husband && !wife) || (!husband && wife)) {
            if (son || daughter) {
                userData.family = 4 //'ひとり親'
            }
        }
        else {
            console.log('介護はどうやって表現しよう')
            //userData.family = 'None'
        }
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