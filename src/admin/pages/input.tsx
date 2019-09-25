import React from 'react'
import { fireStore, systemIndex } from '../../firebase/firebase'
import { AppState } from '../../store';
import { useSelector } from 'react-redux';
import { sendData } from '../../types/type';
import Header from '../components/header';
import Footer from '../../user/components/footer';
import styled from 'styled-components';
import setting from '../../designSystem/setting';
import Button from '../../designSystem/Button';
import { Container, MainContents, Wrapper } from '../../designSystem/Page';
import { Redirect, RouteComponentProps, withRouter } from 'react-router';

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
    background-color: ${setting.Gray5};
`

const Textarea = styled.textarea`
    resize: none;
    width: 100%;
    padding: 8px;
    margin-bottom: 16px;
    border: solid 2px ${setting.Gray3};
    border-radius: 2px;
`

type historyProps = RouteComponentProps

const Input: React.FC<historyProps> = props => {
    let name: string = ''
    let department: string = ''
    let target: string = ''
    let site: string = ''
    let detail: string = ''
    let targetSex: number = 0
    let targetFamily: number = 0
    let targetAge: number = 0
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
            Category: [category],
            targetFamily: targetFamily,
            targetSex: targetSex,
            targetAge: targetAge

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
                    .then(res => {
                        console.log(res)
                        alert("登録が完了しました。")
                        props.history.push('/admin/')
                    })
                    .catch(err => console.error(err))
            }
        ).catch(err => console.error(err))
    }

    if (!user.isAdmin) {
        return (
            <Redirect to={'/admin/login'} />
        )
    }
    else
        return (
            <Wrapper>
                <Header newSystem />
                <Container>
                    <MainContents>
                        <NewSystemForm>
                            <Title>新制度登録</Title>
                            <InputWrapper>
                                <Label>制度名</Label>
                                <StyledInput type='text' onChange={e => { name = e.target.value }} placeholder="制度名を入力" />
                                <Label>カテゴリ</Label>
                                <Select onChange={e => { category = e.target.value }}>
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
                                <Select onChange={e => { targetSex = parseInt(e.target.value) }} >
                                    <option value="-1">性別を選択してください</option>
                                    <option value="0">男性</option>
                                    <option value="1">女性</option>
                                    <option value="2">すべて</option>
                                </Select>
                                <Select onChange={e => { targetAge = parseInt(e.target.value) }}>
                                    <option value="-1">対象を選択してください</option>
                                    <option value="0">乳児</option>
                                    <option value="1">幼児</option>
                                    <option value="2">小学生</option>
                                    <option value="3">小学生以下</option>
                                    <option value="4">中学生</option>
                                    <option value="5">小中学生</option>
                                    <option value="6">中学生以下</option>
                                    <option value="7">高校生</option>
                                    <option value="8">高校生以下の就学児童</option>
                                    <option value="9">18歳未満</option>
                                    <option value="10">18歳以下</option>
                                    <option value="11">未成年</option>
                                    <option value="12">成人</option>
                                    <option value="13">老人</option>
                                    <option value="14">全年齢</option>
                                </Select>
                                <Select onChange={e => { targetFamily = parseInt(e.target.value) }}>
                                    <option value="-1">対象の家庭を選択してください</option>
                                    <option value="0">独身</option>
                                    <option value="1">夫婦</option>
                                    <option value="2">子持ち</option>
                                    <option value="3">二世帯</option>
                                    <option value="4">ひとり親</option>
                                    <option value="5">介護</option>
                                </Select>
                                <Label>援助対象者</Label>
                                <StyledInput type='text' onChange={e => { target = e.target.value }} placeholder="例:高校生以下のお子様をお持ちのひとり親家庭の方" />
                                <Label>援助方法</Label>
                                <StyledInput type='text' onChange={e => { target = e.target.value }} placeholder="授業料補助など" />
                                <Label>対象地区</Label>
                                <StyledInput type='text' defaultValue={user.city} placeholder="対象地区を入力" />
                                <Label>担当部署</Label>
                                <StyledInput type='text' onChange={e => { department = e.target.value }} placeholder="担当部署を入力" />
                                <Label>詳細</Label>
                                <Textarea rows={5} placeholder="詳細を入力" onChange={e => { detail = e.target.value }} />
                                <Label>公式のページ</Label>
                                <StyledInput placeholder="公式ページURLを入力" type='text' onChange={e => { site = e.target.value }} />
                                <ButtonWrapper>
                                    <Button blue onClick={post}>登録</Button>
                                </ButtonWrapper>
                            </InputWrapper>
                        </NewSystemForm>
                    </MainContents>
                </Container>
                <Footer />
            </Wrapper>
        )

}
export default withRouter<historyProps, React.FC<historyProps>>(Input)



