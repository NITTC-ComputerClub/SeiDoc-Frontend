import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { updateDetailCreator } from '../actions/action'
import { AppState } from '../store'
import Indicator from './indicator'
import { fireStore, systemIndex } from '../firebase/firebase';
import { detailPageLogger } from '../firebase/logger'
import "../scss/detail.scss"
import Header from './footer';
import { System } from '../types/type';

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
            <div className="detail">
                <h1>{detail.Name}</h1>
                <h2>援助対象者</h2>
                <p>{detail.Target}</p>
                <h2>援助方法</h2>
                <p>{detail.Method}</p>
                <h2>担当部署</h2>
                <p>{detail.Department}</p>
                <h2>詳細</h2>
                <p>{detail.Detail}</p>
                <a target="_blank" rel="noopener noreferrer" href={detail.Site}>
                    <button>公式のページへ</button>
                </a>
                <Header />
            </div>
        )
    } else {  //等しくないときはprops優先でfetch
        return (
            <Indicator />
        )
    }
}

export default DetailList