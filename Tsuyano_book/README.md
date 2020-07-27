# React.js & Next.js超入門

JavaScriptで書かれているものをTypeScriptで書き換えながら学んでいく

## chapter3

``` BASH
$ mkdir chapter3
$ cd chapter3
$ npx create-react-app sample-app-typed --typescript
$ cd sample-app-typed
$ npm install --save-dev tslint tslint-react tslint-config-prettier
$ type nul > tslint.json
```

``` json : tslint.json
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

