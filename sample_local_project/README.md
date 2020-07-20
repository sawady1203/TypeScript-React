# ローカルでプロジェクトを立ち上げる

backendもfrontendもTypeScriptで開発を進める場合、tsconfig.jsonファイルを使ってTypeScriptプロジェクトを小さく分けることができる。

## 環境構築

``` bash
mkdir share
type nul > share\tsconfig.json
mkdir share\src
type nul > share\src\utils.ts
```

``` json: tsconfig.json
{
    "compilerOptions": {
        "target": "ES5",
        "outDir": "dist",
        "module": "es6",
        "sourceMap": true,
        "noImplicitReturns": true,
        "noImplicitAny": true,
        "rootDir": "src"
    },
    "include": ["src/**/*"]
}
```

``` javascript: utils.ts
export function randomString() {
  return Math.floor((1 + Math.random()) * 0x10000).toString(16);
}
```

小さいプロジェクト(ProjectA)を作成する

``` BASH
mkdir ProjectA\src
type nul > ProjectA\src\person.ts
```

