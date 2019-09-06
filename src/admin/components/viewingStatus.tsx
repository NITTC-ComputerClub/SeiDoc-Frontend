import React from 'react';

import { useSelector } from 'react-redux';
import { AppState } from '../../store';
import { ageGroup } from '../../types/type';

const compare = (a: ageGroup, b: ageGroup) => {
    if (a.count > b.count) {
      return -1;
    } else {
      return 1;
    }
  };

const ViewingStatus: React.FC<{documentId: string}> = props => {
    let detail = useSelector((state: AppState) => state.detailState.detail)
    const isSystemLoaded = () => {
        // Nameだけでよさそう
        if ((detail.Name !== "") && (detail.Detail !== "") && (detail.Department !== "")) {
            detail.ageGroup.sort(compare);
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
                      <tr>
                        <th>今週の閲覧数</th>
                        <th>今月の閲覧数</th>
                        <th>総閲覧数</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr>
                        <th>{detail.weeklyView.reduce((previous,current) => previous=+current)}</th>
                        <th>{detail.monthlyView}</th>
                        <th>{detail.totalView}</th>
                      </tr>
                  </tbody>
              </table>
              {detail.ageGroup.length === 0 ? 
                <div /> 
                :
                <table>
                    <thead>
                        <tr>
                        <td colSpan={3} align="center">よく閲覧している層</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {detail.ageGroup.map((d,i) => (
                                <td key={i}>{i+1}位: {d.age}代</td>
                            ))}
                        </tr>
                    </tbody>
                </table>
              }
          </div>
        )
    } else{
        return (
          <div>not loaded</div> 
        )
    }
    
}

export default ViewingStatus