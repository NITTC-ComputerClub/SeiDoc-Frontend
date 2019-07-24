import * as React from 'react'
import { System } from '../reducers/systemsReducer'


const Table: React.FC = () => {
    const body = 
    <tr>
        <td>児童手当</td>
        <td>各区民生子ども課</td>
        <td>愛知県名古屋市</td>
        <td>http://www.city.nagoya.jp/kodomoseishonen/page/0000034404.html</td>
        <td>子どもを養育されている方に対して児童手当が支給されます。</td>
        <td>中学生以下の子ども持つ保護者</td>
        <td>金銭補助</td>
        <td>子育て,育児</td>
    </tr>
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>制度名</th>
                        <th>課</th>
                        <th>場所</th>
                        <th>URL</th>
                        <th>詳細</th>
                        <th>方法</th>
                        <th>カテゴリ</th>
                    </tr>
                </thead>
                <tbody>
                    {body}
                </tbody>
            </table>
        </div>
    )
}

export default Table