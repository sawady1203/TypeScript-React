# Creating a class component

クラスベースのコンポーネントを作成してみる

``` BASH
# 環境構築
$ npx create-react-app my-components --typescript

# my-componentsというプロジェクトが作成される

# tslintの追加
$ cd my-components
$ npm install tslint tslint-react tslint-config-prettier --save-dev
$ type nul > tslint.json
```

```json: tslint.json
{
    {
    "extends": ["tslint:recommended", "tslint-react", "tslint-config-prettier"],
    "rules":{
        "ordered-imports": false,
        "object-literal-sort-keys": false,
        "no-debugger": false,
        "no-console": false,
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

コンポーネントをつくっていく

``` BASH
# ファイルの作成
$ type nul > src/Confirm.tsx

# css
$ type nul > src/Confirm.css
```
