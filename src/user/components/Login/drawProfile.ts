import { profileDataType } from '../../../types/type'

const DrawProfile = (profileData: Array<profileDataType>) => {
    if (profileData.length !== 0) {
        console.log('check:', profileData)
        const obj = document.getElementById('showImage') as HTMLElement
        const canvas = document.getElementById('cvs') as HTMLCanvasElement
        const context = canvas.getContext('2d') as CanvasRenderingContext2D
        context.lineWidth = 3  //線の太さ設定

        // 前回の入力フォームを削除
        const ageNode = document.querySelectorAll('input.view_age')
        if (ageNode.length !== 0) {
            ageNode.forEach((child) => {
                obj.removeChild(child)
            })
        }
        const relationshipNode = document.querySelectorAll('input.view_relationship')
        if (relationshipNode.length !== 0) {
            relationshipNode.forEach((child) => {
                obj.removeChild(child)
            })
        }

        profileData.forEach(element => {
            const heigh = element.boundingBox.height
            const left = element.boundingBox.left
            const top = element.boundingBox.top
            const width = element.boundingBox.width
            const gender = element.gender
            const age = element.age
            const relationship = element.relationship
            const person = element.isPerson

            // 顔に四角を生成 
            if (gender === 'Male') {
                context.strokeStyle = 'blue'
            }
            else if (gender === 'Female') {
                context.strokeStyle = 'red'
            }
            if (person) {
                context.strokeStyle = 'green'
            }
            context.strokeRect(left, top, width, heigh)

            // 年齢のテキストボックスを生成 
            const viewAge = document.createElement('input')
            viewAge.className = 'view_age' // これでCSS当てられる？

            viewAge.value = age.toString()
            viewAge.style.position = 'absolute'
            viewAge.style.top = top - 30 + 'px'
            viewAge.style.left = left + 'px'
            viewAge.style.width = width + 'px'
            obj.appendChild(viewAge) //bodyの子ノードリストの末尾にノードを追加

            //家族関係のテキストボックス生成
            const viewRelationship = document.createElement('input')
            viewRelationship.className = 'view_relationship'
            if (person) viewRelationship.value = '本人'
            else viewRelationship.value = relationship
            viewRelationship.style.position = 'absolute'
            viewRelationship.style.top = top - 50 + 'px'
            viewRelationship.style.left = left + 'px'
            viewRelationship.style.width = width + 'px'
            obj.appendChild(viewRelationship)
        })
    }
}

export default DrawProfile