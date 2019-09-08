import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { updateDetailCreator } from '../../actions/action'
import { AppState } from '../../store'
import { fireStore, systemIndex } from '../../firebase/firebase';
import Indicator from '../../components/indicator';
import { System } from '../../types/type';
import { detailPageLogger } from '../../firebase/logger';
import styled from 'styled-components';
import setting from '../../designSystem/setting';
import Button from '../../designSystem/Button';

const SystemTile = styled.div`
    overflow: hidden;
    background-color: ${setting.White};
    border-radius: 4px;

    h3 {
        margin: 0;
        padding: 8px 16px;
        background-color: ${setting.ThemeGreen};
        font-weight: lighter;
        font-size: ${setting.H2}
    }

    p, a {
        display: block;
        padding : 8px 16px;
        margin: 0;
    }
`

const FlexBox = styled.div`
    display: flex;

    h2 {
        font-size: ${setting.H2}
    }

    button {
        margin: auto 0 auto auto;
    }
`

const Title = styled.h1`
    font-size: ${setting.H1}
`

const DetailList: React.FC<{ documentId: string }> = (props) => {
    const user = useSelector((state: AppState) => state.userState)
    let detail = useSelector((state: AppState) => state.detailState.detail)

    const dispatch = useDispatch()
    const updateDetail = (data: System) => dispatch(updateDetailCreator(data))
    let isLoading: boolean = false

    const isSystemLoaded = () => {
        // Nameだけでよさそう
        if ((detail.Name !== "") && (detail.Detail !== "") && (detail.Department !== "")) {
            return true
        } else {
            return false
        }
    }

    if (props.documentId !== detail.documentID) {
        isLoading = true
        detail.documentID = props.documentId    //無限ループ防止
        fireStore.collection(systemIndex).doc(props.documentId).get().then(res => {
            if (res.exists) {
                const detailData = res.data() as System
                updateDetail(detailData)
                isLoading = false
            }
        }).catch(err => console.error(err))
    }

    if (!isLoading && isSystemLoaded()) {   //等しいときはfetchなし
        detailPageLogger(detail.documentID, user, detail)
        return (
            <div>
                <Title>
                    {detail.Name}
                </Title>
                <FlexBox>
                    <h2>公開内容</h2>
                    <Button blue>編集</Button>
                </FlexBox>
                <SystemTile>
                    <h3>援助対象者</h3>
                    <p>{detail.Target}</p>
                    <h3>援助方法</h3>
                    <p>{detail.Method}</p>
                    <h3>担当部署</h3>
                    <p>{detail.Department}</p>
                    <h3>詳細</h3>
                    <p>{detail.Detail}</p>
                    <h3>公式サイト</h3>
                    <a href={detail.Site}>{detail.Site}</a>
                </SystemTile>
            </div>
        )
    } else {  //等しくないときはprops優先でfetch
        return (
            <Indicator />
        )
    }
}

export default DetailList