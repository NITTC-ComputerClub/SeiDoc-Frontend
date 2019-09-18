import { profileDataType } from '../../../types/type'

const DrawProfile = (profileData: Array<profileDataType>) => {
    if (profileData.length !== 0) {
        const obj = document.getElementById('showImage') as HTMLElement
        const canvas = document.getElementById('cvs') as HTMLCanvasElement
        const context = canvas.getContext('2d') as CanvasRenderingContext2D
        context.lineWidth = 3  //線の太さ設定

        profileData.forEach(element => {
            const heigh = element.boundingBox.height
            const left = element.boundingBox.left
            const top = element.boundingBox.top
            const width = element.boundingBox.width
            const gender = element.gender
            const age = element.age

            // 顔に四角を生成 
            if (gender === 'Male') {
                context.strokeStyle = 'blue'
            }
            else if (gender === 'Female') {
                context.strokeStyle = 'red'
            }
            context.strokeRect(left, top, width, heigh)

            // 年齢のテキストボックスを生成 
            const inputAge = document.createElement('input')
            inputAge.className = 'info' // これでCSS当てられる？

            inputAge.value = age.toString()
            inputAge.style.position = 'absolute'
            inputAge.style.top = top - 30 + 'px'
            inputAge.style.left = left + 'px'
            inputAge.style.width = width - 5 + 'px'
            obj.appendChild(inputAge) //bodyの子ノードリストの末尾にノードを追加

            //家族関係のセレクトボックス作成 
            const selectRelationship = document.createElement('select')
            selectRelationship.className = 'info'
            selectRelationship.add(new Option('本人', '本人'))
            selectRelationship.add(new Option('夫', '夫'))
            selectRelationship.add(new Option('妻', '妻'))
            selectRelationship.add(new Option('息子', '息子'))
            selectRelationship.add(new Option('娘', '娘'))
            selectRelationship.add(new Option('祖父', '祖父'))
            selectRelationship.add(new Option('祖母', '祖母'))

            for (let i = 0; i < selectRelationship.length; i++) {
                if (selectRelationship.options[i].value === element.relationship) {
                    selectRelationship.selectedIndex = i
                    break
                }
            }

            selectRelationship.style.position = 'absolute'
            selectRelationship.style.top = top - 50 + 'px'
            selectRelationship.style.left = left + 'px'
            selectRelationship.style.width = width + 20 + 'px'
            obj.appendChild(selectRelationship)
        })
    }
}

export default DrawProfile