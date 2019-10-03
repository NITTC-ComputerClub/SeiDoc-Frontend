import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from '../../../store'
import { loginCreator } from '../../../actions/action'
import drawProfile from './drawProfile'
import { withRouter, RouteComponentProps } from 'react-router'
import { profileDataType, UserState, TargetSex, TargetFamily } from '../../../types/type'
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

    const [sequence, setSequence] = useState<number>(-1)

    useEffect(() => {
        drawProfile(props.profileData)
    }, [props.profileData])

    useEffect(() => {
        const canvas = document.getElementById('cvs') as HTMLCanvasElement

        const onClick = (e: MouseEvent) => {
            const selectAge = document.getElementById('age') as HTMLSelectElement
            const selectRelationship = document.getElementById('relationship') as HTMLSelectElement
            const rect = canvas.getBoundingClientRect()
            const ratio = canvas.width / canvas.clientWidth // client -> canvas 座標変換用
            const x = (e.clientX - rect.left) * ratio
            const y = (e.clientY - rect.top) * ratio

            props.profileData.forEach((element, index) => {
                if (element.boundingBox.left <= x && x <= (element.boundingBox.left + element.boundingBox.width)
                    && element.boundingBox.top <= y && y <= (element.boundingBox.top + element.boundingBox.height)) {
                    for (let i = 0; i < selectRelationship.length; i++) {
                        if (selectRelationship.options[i].value === element.relationship) {
                            if (element.isMyself && element.gender === 'Male') selectRelationship.selectedIndex = 0
                            else if (element.isMyself && element.gender === 'Female') selectRelationship.selectedIndex = 1
                            else selectRelationship.selectedIndex = i
                            selectAge.selectedIndex = element.age
                            setSequence(index)
                            break
                        }
                    }
                }
            })
        }

        canvas.addEventListener('click', onClick, false)
    }, [props])

    const editData = () => {
        const selectAge = document.getElementById('age') as HTMLSelectElement
        const selectRelationship = document.getElementById('relationship') as HTMLSelectElement
        const value: profileDataType = props.profileData[sequence]
        value.age = Number(selectAge.value)
        if (selectRelationship.value === '本人-男性') {
            value.isMyself = true
            value.gender = 'Male'
        }
        else if (selectRelationship.value === '本人-女性') {
            value.isMyself = true
            value.gender = 'Female'
        }
        else {
            value.relationship = selectRelationship.value
            value.isMyself = false
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

    const updateData = () => {
        const husband: boolean = props.profileData.some((value: profileDataType) => { return value.relationship === '夫' })
        const wife: boolean = props.profileData.some((value: profileDataType) => { return value.relationship === '妻' })
        const son: boolean = props.profileData.some((value: profileDataType) => { return value.relationship === '息子' })
        const daughter: boolean = props.profileData.some((value: profileDataType) => { return value.relationship === '娘' })
        const grandfather: boolean = props.profileData.some((value: profileDataType) => { return value.relationship === '父' })
        const grandmother: boolean = props.profileData.some((value: profileDataType) => { return value.relationship === '母' })

        //家族構成を登録
        if (props.profileData.length === 1) {
            userData.targetFamily = TargetFamily.独身
        }
        else if (husband && wife) {
            if (props.profileData.length === 2) {
                userData.targetFamily = TargetFamily.夫婦
            }
            else if ((son || daughter) && !grandfather && !grandmother) {
                userData.targetFamily = TargetFamily.子持ち
            }
            else if (grandfather || grandmother) {
                userData.targetFamily = TargetFamily.二世帯
            }
        }
        else if ((husband && !wife) || (!husband && wife)) {
            if (son || daughter) {
                userData.targetFamily = TargetFamily.ひとり親
            }
        }
        else {
            userData.targetFamily = TargetFamily.不明
        }

        userData.family = [] //データの初期化
        props.profileData.forEach((value) => {
            //家族情報更新
            let sex = TargetSex.other
            if (value.gender === 'Male') {
                sex = TargetSex.male
            }
            else if (value.gender === 'Female') {
                sex = TargetSex.female
            }
            userData.family.push({
                relationship: value.relationship,
                age: value.age,
                gender: sex
            })

            //本人情報更新
            if (value.isMyself) {
                userData.sex = sex
            }
        })
    }

    const handleFirebaseUpdata = () => {
        updateData() //データ更新
        console.log('userData:', userData)
        const uid = userData.userId
        const sendData = userData
        delete sendData.userId
        fireStore.collection('user').doc(uid).update(sendData).then(res => {
            console.log('updata firebase', uid)
        })
    }

    const ageLoop = () => {
        const items = []
        for (let i = 0; i < 99; i++) {
            items.push(<option key={i} value={i}>{i}</option>)
        }
        return items
    }

    return (
        <div>
            <p>関係</p>
            <select id='relationship'>
                <option value='本人-男性'>本人-男性</option>
                <option value='本人-女性'>本人-女性</option>
                <option value='夫'>夫</option>
                <option value='妻'>妻</option>
                <option value='息子'>息子</option>
                <option value='娘'>娘</option>
                <option value='父'>父</option>
                <option value='母'>母</option>
            </select>
            <p>年齢</p>
            <select id='age'>
                {ageLoop()}
            </select>
            <button onClick={editData}>修正</button>
            <button onClick={() => {
                props.history.push('/finish')
                login(userData)
                handleFirebaseUpdata()
            }}>登録完了</button>
        </div>
    )
}

export default withRouter<propsType, React.FC<propsType>>(FixProfile)