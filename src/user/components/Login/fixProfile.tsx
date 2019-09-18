import React, { useState, SetStateAction } from 'react'
import { profileDataType } from '../../../types/type'

type propsType = {
    profileData: Array<profileDataType>,
    setProfileData: React.Dispatch<SetStateAction<Array<profileDataType>>>
}

const FixProfile: React.FC<propsType> = (props) => {
    const canvas = document.getElementById('cvs') as HTMLCanvasElement

    const onClick = (e: MouseEvent) => {
        const inputAge = document.getElementById('age') as HTMLInputElement
        const selectRelationship = document.getElementById('relationship') as HTMLSelectElement
        const rect = canvas.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        props.profileData.forEach(element => {
            if (element.boundingBox.left <= x && x <= (element.boundingBox.left + element.boundingBox.width)
                && element.boundingBox.top <= y && y <= (element.boundingBox.top + element.boundingBox.height)) {
                for (let i = 0; i < selectRelationship.length; i++) {
                    if (selectRelationship.options[i].value === element.relationship) {
                        selectRelationship.selectedIndex = i
                        inputAge.value = element.age.toString()
                        break
                    }
                }
                
                //TODO 性別どうするよ
            }
        })
    }

    canvas.addEventListener('click', onClick, false)

    return (
        <div>
            <p>関係</p>
            <select id='relationship' onChange={(e) => console.log('')}>
                <option value='本人'>本人</option>
                <option value='夫'>夫</option>
                <option value='妻'>妻</option>
                <option value='息子'>息子</option>
                <option value='娘'>娘</option>
                <option value='祖父'>祖父</option>
                <option value='祖母'>祖母</option>
            </select>
            <p>年齢</p>
            <input id='age' type="text" onChange={(e) => console.log('')}></input>
        </div>
    )
}

export default FixProfile