import React from 'react';

import { useSelector } from 'react-redux';
import { AppState } from '../../store';


const ViewingStatus: React.FC<{documentId: string}> = props => {
    let detail = useSelector((state: AppState) => state.detailState.detail)
    const isSystemLoaded = () => {
        // Nameだけでよさそう
        if ((detail.Name !== "") && (detail.Detail !== "") && (detail.Department !== "")) {
            return true
        } else {
            return false
        }
    }

    if (isSystemLoaded()) {
        return (
          <div>
              <h3>閲覧状況</h3>
              <table>
                  <thead>
                      <td>今週の閲覧数</td>
                      <td>今月の閲覧数</td>
                      <td>総閲覧数</td>
                  </thead>
                  <tbody>
                      <td>{detail.weeklyView.reduce((previous,current) => previous=+current)}</td>
                      <td>{detail.monthlyView}</td>
                      <td>{detail.totalView}</td>
                  </tbody>
              </table>
              <table>
                  <thead>
                     <td colSpan={3} align="center">よく閲覧している層</td>
                  </thead>
                  <tbody>
                      <td>1位: 30代女性</td>
                      <td>2位: 30代男性</td>
                      <td>3位: 40代女性</td>
                  </tbody>
              </table>
          </div>
        )
    } else{
        return (
          <div>not loaded</div> 
        )
    }
    
}

export default ViewingStatus