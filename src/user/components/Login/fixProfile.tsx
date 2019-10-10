import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from '../../../store'
import { loginCreator } from '../../../actions/action'
import drawProfile from './drawProfile'
import { withRouter, RouteComponentProps } from 'react-router'
import { profileDataType, UserState, TargetSex, TargetFamily, TargetAge } from '../../../types/type'
import { fireStore } from '../../../firebase/firebase'
import Button from '../../../designSystem/Button'
import styled from 'styled-components'
import setting from '../../../designSystem/setting'

type historyProps = RouteComponentProps

type dataType = {
    profileData: Array<profileDataType>,
}
type propsType = historyProps & dataType

const SelectBox = styled.div`
    label {
        display: block;
        font-size: ${setting.P1};
        text-align: left;
    }

    select {
        background-color: ${setting.Gray5};
        box-sizing: border-box;
        padding: 8px 4px;
        border-radius: 4px;
        border: none;
    }
`

const FlexBox = styled.div`
    margin: 0 auto;
    width: 240px;
    display: flex;
`

const Menu = styled.div`
    display: flex;
    margin: 32px 32px;

    .right {
        margin: 0 0 0 auto;
    }
`

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

    const calcAge = (age: number) => {
        const category: Array<TargetAge> = []
        if (0 <= age && age <= 1) {
            category.push(TargetAge.乳児);
        }
        if (1 < age && age <= 6) {
            category.push(TargetAge.幼児)
        }
        if (6 < age && age <= 12) {
            category.push(TargetAge.小学生);
            category.push(TargetAge.小中学生);
        }
        if (12 < age && age <= 15) {
            category.push(TargetAge.中学生);
            category.push(TargetAge.小中学生);
        }
        if (15 < age && age <= 18) {
            category.push(TargetAge.高校生);
        }
        if (age <= 12) {
            category.push(TargetAge.小学生以下);
        }
        if (age <= 15) {
            category.push(TargetAge.中学生以下);
        }
        if(age < 18){
            category.push(TargetAge.高校生以下の就学児童);
            category.push(TargetAge.拾八歳以下);
            category.push(TargetAge.拾八歳未満);
        }else if (age === 18){
            category.push(TargetAge.拾八歳以下);
            category.push(TargetAge.高校生以下の就学児童);
        }
        if (age < 20) {
            category.push(TargetAge.未成年);
        }
        if (20 <= age) {
            category.push(TargetAge.成人);
        }
        if (65 <= age) {
            category.push(TargetAge.老人);
        }
        return category;
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
                gender: sex,
                category: calcAge(value.age)
            })

            //本人情報更新
            if (value.isMyself) {
                userData.sex = sex
            }
        })
    }

    const handleFirebaseUpdata = () => {
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
            <FlexBox>
                <SelectBox style={{ margin: '0 auto 0 0' }}>
                    <label>関係</label>
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
                </SelectBox>
                <SelectBox>
                    <label>年齢</label>
                    <select id='age'>
                        {ageLoop()}
                    </select>
                    歳
                </SelectBox>
            </FlexBox>
            <Button wide green onClick={editData}>関係と年齢を修正</Button>
            <Menu>
                <Button className="right" blue onClick={() => {
                    props.history.push('/finish')
                    updateData() //データ更新
                    login(userData)
                    handleFirebaseUpdata()
                }}>次へ</Button>
            </Menu>
        </div>
    )
}

export default withRouter<propsType, React.FC<propsType>>(FixProfile)