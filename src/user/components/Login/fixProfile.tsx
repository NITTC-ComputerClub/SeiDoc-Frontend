import React, { useState } from 'react'
import drawProfile from './drawProfile'
import { profileDataType } from '../../../types/type'

type propsType = {
    profileData: Array<profileDataType>,
    setProfileData: React.Dispatch<React.SetStateAction<Array<profileDataType>>>
}

const FixProfile: React.FC<propsType> = (props) => {
    const canvas = document.getElementById('cvs') as HTMLCanvasElement
    const [sequence, setSequence] = useState<number>(0)

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
                //TODO 性別どうするよ
            }
        })
    }

    const fetchData = () => {
        const inputAge = document.getElementById('age') as HTMLInputElement
        const selectRelationship = document.getElementById('relationship') as HTMLSelectElement
        const value: profileDataType = props.profileData[sequence]
        value.age = Number(inputAge.value)
        value.relationship = selectRelationship.value
        console.log(value)
        props.profileData.splice(sequence, 1, value)
        console.log(props.profileData)
        props.setProfileData(props.profileData)
    }

    canvas.addEventListener('click', onClick, false)

    return (
        <div>
            {drawProfile(props.profileData)}
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
            <button onClick={fetchData}>保存</button>
        </div>
    )
}

export default FixProfile