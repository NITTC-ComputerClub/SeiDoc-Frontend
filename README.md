##【SeiDocsとは】
「SeiDocs」は地方の制度を紹介、閲覧するためのwebアプリケーションです。

多くの人が抱える問題点として
・役所に行く時間がない
・制度の名前を知らず、うまく調べられない
・そもそも調べるのが面倒くさい
と言ったものがあります。

また、役所に訪問したはいいものの部署が誤っており正しい案内を受けられなかったなどのケースも多く、自分が恩恵を受けられる制度をしっかりと把握するのは難しいのが実情です。

SeiDocsでは、以下の機能によってそれらを解決します。

##【一般ユーザ向け機能】

「検索機能」
タップのみで類似制度を閲覧できるカテゴリ検索と、フリーワードによる全文検索を実装し、粒度の異なる検索を可能にしました。
また、複数の地域に対して検索を行い比較することもできます。

「制度の提案」
検索が面倒である層に向けて、住んでいる場所、年収、家族構成といったユーザ情報を登録することで、対象となる制度を提案する機能を実装しました。
家族写真などから画像認識によって年齢や家族構成を分析し制度を提案する機能もあり、写真をアップロードするだけでワード入力を介さずに制度を調べることも可能です。

##【役所・管理者向け機能】
「制度の興味関心を調べる」
地域で行われるアンケートに回答をすること自体がめんどうくさいと言う人も少なくありません。
そこで、ログの集計機能を実装しランキング形式で閲覧数が確認できるようにしました。
集計結果から、住民の素直なニーズ・興味を確認することが可能になります。

「制度を登録・オープンデータ化する」
近年、オープンデータに取り組む地域は増加傾向にあります。しかし、PDFなどデータとして利用不可なものや独占形式が多く、利用しづらいのが現状です。
そこで役員向けに制度の登録ページを作成しました。このページに必要事項を入力すれば、アプリ上での公開ができ、オープンデータ(CSV)として出力することも可能になっています。
この機能によってそれぞれの制度の担当部署や内容が明確化され、従来よりも適切な対応を可能にします。


# SeiDoc
H30プロコン課題部門
*SeiDoc*のリポジトリです。
[![CircleCI](https://circleci.com/gh/NITTC-ComputerClub/SeiDoc/tree/master.svg?style=svg&circle-token=1ab7e100245b294fbfbcbb51f7da6c7953598f88)](https://circleci.com/gh/NITTC-ComputerClub/SeiDoc/tree/master)


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
