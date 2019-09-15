import React from 'react'
import { fireStore, systemIndex } from '../../firebase/firebase'
import { AppState } from '../../store';
import { useSelector } from 'react-redux';
import { sendData } from '../../types/type';
import Header from '../../admin/components/header';
import Footer from '../../user/components/footer';
import styled from 'styled-components';
import setting from '../../designSystem/setting';
import Button from '../../designSystem/Button';
import { Container, MainContents } from '../../designSystem/Page';

const Title = styled.h1`
    font-size: ${setting.H1};
`

const SystemTile = styled.div`
    box-sizing: border-box;
    overflow: hidden;
    background-color: ${setting.White};
    border-radius: 4px;
`

const TitleInputField = styled.input`
    box-sizing: border-box;
    display: block;
    margin: 0;
    border: none;
    width: 100%;
    
    font-size: ${setting.H2};
    font-weight: bold;
    color: ${setting.TextGray};
    background-color: ${setting.ThemeBlue};
    padding: 16px 16px 8px 16px;

    ::focus {
        outline: none;
    }
`

const InputField = styled.input`
    box-sizing: border-box;
    display: block;
    margin: 0;
    border: none;
    width: 100%;

    font-size: ${setting.H2};
    padding: 8px 16px;

    :focus {
        outline: 0;
    }
`

const Label = styled.h2`
    background-color: ${setting.ThemeGreen};
    margin: 0;
    font-size: ${setting.H2};
    font-weight: normal;
    padding: 8px 16px;
`

const Select = styled.select`
    margin: 0;
    border: none;
    width: 100%;

    font-size: ${setting.H2};
    padding: 8px 16px;
    height: 40px;
    color: ${setting.TextBlack};
    background-color: ${setting.White};

    :focus {
        outline: 0;
    }
`

const TextField = styled.textarea`
    box-sizing: border-box;
    width: 100%;
    font-size: ${setting.H2};
    padding: 8px 16px;

    resize: none;
    border: none;

    :focus {
        outline: 0;
    }
`

const ButtonWrapper = styled.div`
    margin-top: 16px;
    text-align: right;
`

const Input: React.FC = () => {
    let name: string = ''
    let department: string = ''
    let target: string = ''
    let site: string = ''
    let detail: string = ''
    let targetSex: number = 0
    let targetFamily: number = 0
    let sysmethod: Array<string> = ['金銭補助']
    let category: string = ''
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
            Category: [category]
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
                    <Title>新制度登録</Title>
                    <SystemTile>
                        <Label>制度名</Label>
                        <TitleInputField type='text' onChange={e => { name = e.target.value }} placeholder="制度名を入力"/>
                        <Label>カテゴリ</Label>
                        <Select onChange={e => {category = e.target.value}}>
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
                        <Label>おおまかな制度対象者</Label>
                        <Select onChange={e => {targetSex = parseInt(e.target.value)}} >
                            <option value="0">男性</option>
                            <option value="1">女性</option>
                            <option value="2" defaultChecked>すべて</option>
                        </Select>
                        <Select onChange={e =>{targetFamily = parseInt(e.target.value)}}>
                            <option value="0">独身</option>
                            <option value="1">夫婦</option>
                            <option value="2">子持ち</option>
                            <option value="3">ひとり親</option>
                            <option value="4">介護</option>
                        </Select>
                        <Label>援助対象者</Label>
                        <InputField type='text' onChange={e => { target = e.target.value }} placeholder="例:高校生以下のお子様をお持ちのひとり親家庭の方" />
                        <Label>援助方法</Label>
                        <InputField type='text' onChange={e => { target = e.target.value }} placeholder="授業料補助など"/>
                        <Label>対象地区</Label>
                        <InputField type='text' defaultValue={user.city} placeholder="対象地区を入力" />
                        <Label>担当部署</Label>
                        <InputField type='text' onChange={e => { department = e.target.value }} placeholder="担当部署を入力" />
                        <Label>詳細</Label>
                        <TextField placeholder="詳細を入力" onChange={e => { detail = e.target.value }} />
                        <Label>公式のページ</Label>
                        <InputField placeholder="公式ページURLを入力" type='text' onChange={e => { site = e.target.value }} />
                    </SystemTile>
                    <ButtonWrapper>
                        <Button blue onClick={post}>登録</Button>
                    </ButtonWrapper>
                </MainContents>
            </Container>
            <Footer />
        </div>
    )
}
export default Input

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


