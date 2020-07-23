# create-react-appを使わずにReactプロジェクトを立ち上げる

``` BASH
# rootフォルダを作成して移動
$ mkdir manually_project
$ cd manually_project

# package.jsonを作成する
$ npm init

# typescriptをプロジェクト下にインストールする
$ npm install typescript --save-dev

# tsconfig.jsonを作成する
$ type nul > tsconfig.json

```

``` json: tsconfig.json
{
    "compilerOptions": {
        "target": "ES6",
        "module": "es6",
        "moduleResolution": "node",
        "lib": ["es6", "dom"],
        "sourceMap": true,
        "jsx": "react",
        "strict": true,
        "noImplicitReturns": true,
        "rootDir": "src",
        "outDir": "dis"
    },
    "include": ["**/*.ts", "**/*.tsx"],
    "exclude": ["node_modules"]
}
```

``` BASH
# tslintのインストール
$ npm install tslint --save-dev

# tslint.jsonの作成
$ type nul > tslint.json
```

``` json: tslint.json
{
    "extends": ["tslint:recommended", "tslint-react", "tslint-config-prettier"],
    "linterOptions": {
        "exclude": ["node_modules/**/*.ts"]
    }
}
```

``` BASH
# reactとreact-domのインストール
$ npm install react react-dom

# typescriptでreactの開発をすすめるため
$ npm install @types/react @types/react-dom --save-dev
```

rootとなるHTMLファイルを作成する。

``` BASH
# dist内に作成する
$ type nul > dist\index.html
$ type nul > dist\bundle.js
```

``` HTML: index.html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="root"></div>
    <script src="bundle.js"></script>
</body>
</html>
```

すべてのjavascriptコードは`dist/bundle.js`という1つのファイルにまとめられて`index.html`で読み込まれる。

シンプルなReactコンポーネントを作成する。

``` BASH
# ファイルの作成
$ type nul > src/index.tsx
```

``` JS: src/index.tsx
import * as React from "react";
import * as ReactDOM from "react-dom";

const App: React.SFC = () => {
  return <h1>My React App!</h1>;
};

ReactDOM.render(<App />, document.getElementById("root") as HTMLElement);
```

このコンポーネントを集約してbundle.jsにするために、webpackを追加する。

``` BASH
# webpackのインストール
$ npm install webpack webpack-cli --save-dev

# webpackの簡易サーバーをインストール
$ npm install webpack webpack-dev-server --save-dev

# webpackのTypeScript用のプラグイン
$ npm install ts-loader --save-dev

# webpack用の設定ファイルを作成する
$ type nul > webpack.config.js
```

``` JS: webpack.confing.js
const path = require("path");

module.exports = {
  entry: "./src/index.tsx",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000,
  },
};
```

ファイルが作成されたので簡易サーバーとビルドをnpmスクリプトで実行できるようにする。
これには`package.json`にscriptを追加する。

``` json: package.json
{
// ...
　"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "webpack-dev-server --env development",
    "build": "webpack --env production"
// ...
}
```

``` BASH
# webpackでbuildしてみる
$ npm run build

> manually_project@1.0.0 build C:\Users\~\manually_project
> webpack --env production

Hash: e5cc87ea304532f0283e
Version: webpack 4.43.0
Time: 19390ms
Built at: 2020-07-21 17:13:19
    Asset     Size  Chunks             Chunk Names
bundle.js  128 KiB       0  [emitted]  main
Entrypoint main = bundle.js
[3] ./src/index.tsx 258 bytes {0} [built]
    + 7 hidden modules

WARNING in configuration
The 'mode' option has not been set, webpack will fallback to 'production' for this value. Set 'mode' option to 'development' or 'production' to enable defaults for each environment.
You can also set it to 'none' to disable any default behavior. Learn more: https://webpack.js.org/configuration/mode/

# 簡易サーバーの起動
$ npm start
# locaclhohst:9000で確認できる
```

ビルドして簡易サーバーが動くことを確認した。
