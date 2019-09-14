import React from 'react'
import { fireStore, systemIndex } from '../../firebase/firebase'
import { AppState } from '../../store';
import { useSelector } from 'react-redux';
import { sendData } from '../../types/type';
import Header from '../../admin/components/header';
import Footer from '../components/footer';
import styled from 'styled-components';
import setting from '../../designSystem/setting';
import Button from '../../designSystem/Button';
import { Container, MainContents } from '../../designSystem/Page';

const Title = styled.h1`
    font-size: ${setting.H1};
    margin-bottom: 16px;
`

const Label = styled.label`
    display: block;
`

const ButtonWrapper = styled.div`
    margin-top: 16px;
    text-align: right;
`

const NewSystemForm = styled.div`
    width: 100%;
    background-color: ${setting.White};
    border-radius: 4px;
    overflow: hidden;
    margin-top: 32px;
    padding: 32px 16px;
    text-align: center;
`

const InputWrapper = styled.div`
    max-width: 460px;
    margin: 0 auto;
    width: 100%;
    text-align: left;
    
    * {
        box-sizing: border-box;
    }
`

const StyledInput = styled.input`
    width: 100%;
    margin-bottom: 16px;
    padding: 8px;
    border-radius: 2px;
    border: solid 2px ${setting.Gray3};
    font-size: ${setting.P1};
    vertical-align: middle;
`

const Select = styled.select`
    width: 100%;
    height: 36px;
    margin-bottom: 16px;
    padding: 8px;
    border-radius: 2px;
    border: none;
    vertical-align: middle;
`

const CheckboxAndRadioWrapper = styled.div`
    margin-left: 16px;
`

const Textarea = styled.textarea`
    resize: none;
    width: 100%;
    padding: 8px;
    margin-bottom: 16px;
    border: solid 2px ${setting.Gray3};
    border-radius: 2px;
`

const NewSytemForm: React.FC = () => {
    let name: string = ''
    let department: string = ''
    let target: string = ''
    let site: string = ''
    let detail: string = ''
    let sysmethod: Array<string> = ['金銭補助']
    let category: Array<string> = []
    let systemData: sendData

    const user = useSelector((state: AppState) => state.userState)
    console.log(user)

    const post = () => {
        systemData = {
            Name: name,
            Location: user.city,
            Department: department,
            Target: target,
            Site: site,
            Detail: detail,
            Method: sysmethod,
            Category: category
        }
        console.log(systemData)
        const systemCollection = fireStore.collection(systemIndex)
        systemCollection.add(systemData).then(
            ref => {
                console.log('Added document with ID: ', ref.id)
                const mode = "no-cors"
                const method = 'POST'
                const body = JSON.stringify(systemData)
                const headers = {
                    'Accept': 'application/json'
                }
                fetch('https://script.google.com/macros/s/AKfycbz4hzx40TvDLIl4MGARBmECM1Gpp3kjb_LUEafA81O3SQ3oC2Pk/exec',
                    { mode, method, headers, body })
                    .then(res => console.log(res))
                    .catch(err => console.error(err))
            }
        ).catch(err => console.error(err))
    }

    return (
        <div>
            <Header />
            <Container>
                <MainContents>
                    <NewSystemForm>
                        <Title>新制度登録</Title>
                        <InputWrapper>
                            <Label>制度名</Label>
                            <StyledInput type='text' onChange={e => { name = e.target.value }} placeholder='制度名を入力'/>
                            <Label>カテゴリ</Label>
                            <Select onChange={e => { name = e.target.value }}>
                                <option defaultChecked>カテゴリを選択</option>
                                <option value="子育て">子育て</option>
                                <option value="介護">介護</option>
                                <option value="建築">建築</option>
                                <option value="病気">病気</option>
                                <option value="融資">融資</option>
                                <option value="地域">地域</option>
                                <option value="高齢者">高齢者</option>
                                <option value="その他">その他</option>
                            </Select>
                            {/* 新しくなりました。ロジックの修正お願いします */}
                            <Label>大まかな制度対象者</Label>
                            <CheckboxAndRadioWrapper>
                                <input type="radio" name="sex" value={0} />男性
                                <input type="radio" name="sex" value={1} />女性
                                <input type="radio" name="sex" value={2} checked />すべて<br/>
                                <input type="checkbox" name="target" value={0} />独身
                                <input type="checkbox" name="target" value={1} />子持ち
                                <input type="checkbox" name="target" value={2} />夫婦
                                <input type="checkbox" name="target" value={3} />ひとり親
                                <input type="checkbox" name="target" value={4} />介護
                            </CheckboxAndRadioWrapper>
                            {/* 新しくなりました。ロジックの修正お願いします */}
                            <Select onChange={ () => {  }}>
                                <option defaultChecked>年齢を選択</option>
                                <option value={0}>乳児</option>
                                <option value={1}>幼児</option>
                                <option value={2}>小学生</option>
                                <option value={3}>小学生以下</option>
                                <option value={4}>中学生</option>
                                <option value={5}>小中学生</option>
                                <option value={6}>中学生以下</option>
                                <option value={7}>高校生</option>
                                <option value={8}>高校生以下の就学児童</option>
                                <option value={9}>18歳未満</option>
                                <option value={10}>18歳以下</option>
                                <option value={11}>未成年</option>
                                <option value={12}>成人</option>
                                <option value={13}>老人</option>
                                <option value={14}>全年齢</option>
                            </Select>
                            <Label>援助対象者</Label>
                            <StyledInput type='text' onChange={e => { target = e.target.value }} placeholder="例:高校生以下のお子様をお持ちのひとり親家庭の方" />
                            <Label>援助方法</Label>
                            <StyledInput type='text' onChange={e => { sysmethod = [e.target.value] }} placeholder="例:授業料補助など" />
                            <Label>担当部署</Label>
                            <StyledInput type='text' onChange={e => { department = e.target.value }} placeholder="担当部署を入力" />
                            <Label>詳細</Label>
                            <Textarea rows={5} onChange={e => { detail = e.target.value }} placeholder="制度の詳細" />
                            <Label>公式のページ</Label>
                            <StyledInput type='text' onChange={e => { site = e.target.value }} placeholder="サイトURL" />
                            <ButtonWrapper>
                                <Button blue onClick={post}>登録</Button>
                            </ButtonWrapper>
                        </InputWrapper>
                    </NewSystemForm>
                </MainContents>
            </Container>
            <Footer />
        </div>
    )
}
export default NewSytemForm

/*
    {
        "Name": "児童手当",
        "Department": "各区民生子ども課",
        "Location": "愛知県名古屋市",
        "Site": "http://www.city.nagoya.jp/kodomoseishonen/page/0000034404.html",
        "Detail": "子どもを養育されている方に対して児童手当が支給されます。",
        "Target": "中学生以下の子ども持つ保護者",
        "Method": [
        "金銭補助"
        ],
        "Category": [
        "子育て",
        "育児"
        ]
  }
*/


