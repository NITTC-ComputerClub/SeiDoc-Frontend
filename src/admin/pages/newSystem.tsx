import React, { useState, ChangeEvent } from "react";
import { fireStore, systemIndex } from "../../firebase/firebase";
import { AppState } from "../../store";
import { useSelector } from "react-redux";
import Header from "../components/header";
import Footer from "../../user/components/footer";
import styled from "styled-components";
import setting from "../../designSystem/setting";
import Button from "../../designSystem/Button";
import { Container, MainContents, Wrapper } from "../../designSystem/Page";
import { Redirect, RouteComponentProps, withRouter } from "react-router";
import { System, TargetAge, TargetSex, TargetFamily } from "../../types/type";

const Title = styled.h1`
  font-size: ${setting.H1};
  margin-bottom: 16px;
`;

const Label = styled.label`
  display: block;
`;

const ButtonWrapper = styled.div`
  margin-top: 16px;
  text-align: right;
`;

const NewSystemForm = styled.div`
  width: 100%;
  background-color: ${setting.White};
  border-radius: 4px;
  overflow: hidden;
  margin-top: 32px;
  padding: 32px 16px;
  text-align: center;
`;

const InputWrapper = styled.div`
  max-width: 460px;
  margin: 0 auto;
  width: 100%;
  text-align: left;

  * {
    box-sizing: border-box;
  }
`;

const StyledInput = styled.input`
  width: 100%;
  margin-bottom: 16px;
  padding: 8px;
  border-radius: 2px;
  border: solid 2px ${setting.Gray3};
  font-size: ${setting.P1};
  vertical-align: middle;
`;

const Select = styled.select`
  width: 100%;
  height: 36px;
  margin-bottom: 16px;
  padding: 8px;
  border-radius: 2px;
  border: none;
  vertical-align: middle;
  background-color: ${setting.Gray5};
`;

const Textarea = styled.textarea`
  resize: none;
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
  border: solid 2px ${setting.Gray3};
  border-radius: 2px;
`;

type historyProps = RouteComponentProps;

const Input: React.FC<historyProps> = props => {
  const user = useSelector((state: AppState) => state.userState);
  const [systemName, setSystemName] = useState<string>("");
  const [department, setDepartment] = useState<string>("");
  const [location, setLocation] = useState<string>(user.address);
  const [site, setSite] = useState<string>("");
  const [detail, setDetail] = useState<string>("");
  const [target, setTarget] = useState<string>("");
  const [method, setMethod] = useState<string>("");
  const [selectionCategory, setSelectionCategory] = useState<string[]>([]);
  const [targetSex, setTargetSex] = useState<number>(0);
  const [selectionTargetFamily, setSelectionTargetFamily] = useState<number[]>(
    []
  );
  const [targetAge, setTargetAge] = useState<TargetAge>(0);

  const categoryList: Array<string> = [
    "子育て",
    "介護",
    "建築",
    "病気",
    "融資",
    "地域",
    "高齢者"
  ];

  const post = () => {
    setSelectionCategory(selectionCategory);
    const systemData: System = {
      Name: systemName,
      Location: location,
      Department: department,
      Target: target,
      Site: site,
      Detail: detail,
      Method: [method],
      Category: selectionCategory,
      CreatedAt: Date.now(),
      UpdatedAt: Date.now(),
      isDeleted: false,
      ExpireAt: 2262025600000,
      documentID: "-1",
      totalView: 0,
      dailyView: 0,
      monthlyView: 0,
      weeklyView: [0, 0, 0, 0, 0, 0, 0],
      ageGroup: [],
      targetFamily: selectionTargetFamily,
      targetSex: targetSex,
      targetAge: targetAge
    };
    console.log(systemData);
    const systemCollection = fireStore.collection(systemIndex);
    systemCollection
      .add(systemData)
      .then(ref => {
        console.log("Added document with ID: ", ref.id);
        const mode = "no-cors";
        const method = "POST";
        const body = JSON.stringify(systemData);
        const headers = {
          Accept: "application/json"
        };
        fetch(
          "https://script.google.com/macros/s/AKfycbz4hzx40TvDLIl4MGARBmECM1Gpp3kjb_LUEafA81O3SQ3oC2Pk/exec",
          { mode, method, headers, body }
        )
          .then(res => {
            console.log(res);
            alert("登録が完了しました。");
            props.history.push("/admin/");
          })
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err));
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectionCategoryArray: string[] = selectionCategory.slice();
    const position = selectionCategoryArray.indexOf(e.target.value);
    if (position === -1) {
      selectionCategoryArray.push(e.target.value);
    } else {
      selectionCategoryArray.splice(position, 1);
    }
    setSelectionCategory(selectionCategoryArray);
  };

  const handleTargetFamilyChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectionTargetFamilyArray: number[] = selectionTargetFamily.slice();
    const position = selectionTargetFamilyArray.indexOf(
      parseInt(e.target.value)
    );
    if (position === -1) {
      selectionTargetFamilyArray.push(parseInt(e.target.value));
    } else {
      selectionTargetFamilyArray.splice(position, 1);
    }
    setSelectionTargetFamily(selectionTargetFamilyArray);
  };

  if (!user.isAdmin) {
    return <Redirect to={"/admin/login"} />;
  } else
    return (
      <Wrapper>
        <Header newSystem />
        <Container>
          <MainContents>
            <NewSystemForm>
              <Title>新制度登録</Title>
              <InputWrapper>
                <Label>制度名</Label>
                <StyledInput
                  type="text"
                  onChange={e => setSystemName(e.target.value)}
                  placeholder="制度名を入力"
                />
                <Label>カテゴリ</Label>
                {categoryList.map(categoryName => (
                  <label key={categoryName}>
                    <input
                      key={categoryName}
                      type="checkbox"
                      value={categoryName}
                      checked={selectionCategory.indexOf(categoryName) !== -1}
                      onChange={e => handleCategoryChange(e)}
                    />
                    {categoryName}
                  </label>
                ))}
                <Label>おおまかな制度対象者</Label>
                <div>
                  <label>
                    <input
                      type="radio"
                      value={TargetSex.male}
                      checked={targetSex === TargetSex.male}
                      onChange={e => setTargetSex(parseInt(e.target.value))}
                    />
                    男性
                  </label>
                  <label>
                    <input
                      type="radio"
                      value={TargetSex.female}
                      checked={targetSex === TargetSex.female}
                      onChange={e => setTargetSex(parseInt(e.target.value))}
                    />
                    女性
                  </label>
                  <label>
                    <input
                      type="radio"
                      value={TargetSex.other}
                      checked={targetSex === TargetSex.other}
                      onChange={e => setTargetSex(parseInt(e.target.value))}
                    />
                    すべて
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      value={TargetFamily.独身}
                      checked={selectionTargetFamily.indexOf(0) !== -1}
                      onChange={e => handleTargetFamilyChange(e)}
                    />
                    独身
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value={TargetFamily.夫婦}
                      checked={selectionTargetFamily.indexOf(1) !== -1}
                      onChange={e => handleTargetFamilyChange(e)}
                    />
                    夫婦
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value={TargetFamily.子持ち}
                      checked={selectionTargetFamily.indexOf(2) !== -1}
                      onChange={e => handleTargetFamilyChange(e)}
                    />
                    子持ち
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value={TargetFamily.二世帯}
                      checked={selectionTargetFamily.indexOf(3) !== -1}
                      onChange={e => handleTargetFamilyChange(e)}
                    />
                    二世帯
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value={TargetFamily.ひとり親}
                      checked={selectionTargetFamily.indexOf(4) !== -1}
                      onChange={e => handleTargetFamilyChange(e)}
                    />
                    ひとり親
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value={TargetFamily.介護}
                      checked={selectionTargetFamily.indexOf(5) !== -1}
                      onChange={e => handleTargetFamilyChange(e)}
                    />
                    介護
                  </label>
                </div>
                {/* {console.log(selectionCategory)}
                                {console.log(selectionTargetFamily)} */}
                <Select
                  onChange={e => {
                    setTargetAge(parseInt(e.target.value));
                  }}
                >
                  <option value="-1">対象を選択してください</option>
                  <option value={TargetAge.乳児}>乳児</option>
                  <option value={TargetAge.幼児}>幼児</option>
                  <option value={TargetAge.小学生}>小学生</option>
                  <option value={TargetAge.小学生以下}>小学生以下</option>
                  <option value={TargetAge.中学生}>中学生</option>
                  <option value={TargetAge.小中学生}>小中学生</option>
                  <option value={TargetAge.中学生以下}>中学生以下</option>
                  <option value={TargetAge.高校生}>高校生</option>
                  <option value={TargetAge.高校生以下の就学児童}>
                    高校生以下の就学児童
                  </option>
                  <option value={TargetAge.拾八歳未満}>18歳未満</option>
                  <option value={TargetAge.拾八歳以下}>18歳以下</option>
                  <option value={TargetAge.未成年}>未成年</option>
                  <option value={TargetAge.成人}>成人</option>
                  <option value={TargetAge.老人}>老人</option>
                  <option value={TargetAge.全年齢}>全年齢</option>
                </Select>
                <Label>援助対象者</Label>
                <StyledInput
                  type="text"
                  onChange={e => setTarget(e.target.value)}
                  placeholder="例:高校生以下のお子様をお持ちのひとり親家庭の方"
                />
                <Label>援助方法</Label>
                <StyledInput
                  type="text"
                  onChange={e => setMethod(e.target.value)}
                  placeholder="授業料補助など"
                />
                <Label>対象地区</Label>
                <StyledInput
                  type="text"
                  defaultValue={user.address}
                  onChange={e => setLocation(e.target.value)}
                  placeholder="対象地区を入力"
                />
                <Label>担当部署</Label>
                <StyledInput
                  type="text"
                  onChange={e => setDepartment(e.target.value)}
                  placeholder="担当部署を入力"
                />
                <Label>詳細</Label>
                <Textarea
                  rows={5}
                  placeholder="詳細を入力"
                  onChange={e => setDetail(e.target.value)}
                />
                <Label>公式のページ</Label>
                <StyledInput
                  placeholder="公式ページURLを入力"
                  type="text"
                  onChange={e => setSite(e.target.value)}
                />
                <ButtonWrapper>
                  <Button blue onClick={post}>
                    登録
                  </Button>
                </ButtonWrapper>
              </InputWrapper>
            </NewSystemForm>
          </MainContents>
        </Container>
        <Footer />
      </Wrapper>
    );
};
export default withRouter<historyProps, React.FC<historyProps>>(Input);
