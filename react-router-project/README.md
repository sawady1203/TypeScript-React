# Installing React Router with routing types

``` BASH
$ npx create-react-app reactshop --typescript
$ cd reactshop
$ npm install tslint tslint-react tslint-config-prettier --save-dev
$ type nul > tslint.json
$ npm install react-router-dom
$ npm install @types/react-router-dom --save-dev
```

tslint.jsonを作成

``` json : tslint.json
{
    {
    "extends": ["tslint:recommended", "tslint-react", "tslint-config-prettier"],
    "rules":{
        "ordered-imports": false,
        "object-literal-sort-keys": false,
        "no-debugger": false,
        "no-console": false
    },
    "linterOptions": {
        "exclude": [
            "config/**/*.js",
            "node_modules/**/*.ts",
            "coverage/lcov-report/*.js"
            ]
        }
    }
}
```

`src`内の必要ないファイルを削除する。

``` BASH
$ rm src\App.tsx src\App.css src\App.test.tsx src\serviceWorker.ts
```

`index.tsx`から削除したファイルをimportしている箇所を削除する

``` JS
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <div />
  </React.StrictMode>,
  document.getElementById("root")
);
```