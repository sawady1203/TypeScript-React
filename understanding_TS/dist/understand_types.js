"use strict";
// 型の付け方
// 変数に型を定義したい
// 普通に考える型
// 数値型
let price = 1000;
// boolean型
let flag = true;
// string型
let myname = "sawada";
// array型
let number_list = [1, 2, 3];
let number_list2 = [4, 5, 6];
// tuple型(要素の数が固定されている)
let x = ["x", 1];
// x = [1, "x"]; //error!
// any型(型が不明な場合に型チェックを不要にする。つかわない)
let whatever = 0;
whatever = "name";
whatever = true;
// unknown型
// any型は文字列を数値型の関数に利用できてしまうが
// unknown型は実行時にエラーではじくことができる
// const certainlyNubers: number[] = ["0"]; // error
const maybeNumbers = ["0", 1];
const probablyNumbers = [1, 2, "3"];
// console.log(maybeNumbers[0].toFixed()); // error!
console.log(maybeNumbers[1].toFixed()); // numberからstringに変換する
// unknownは数値型と型付けしてない場合、実行時エラーになる
// console.log(probablyNumbers[0].toFix()); // Error!
// void型
// 型が全くないことをしめす
// 値を返さない関数の戻り型として利用する
function logger(message) {
    console.log(message);
}
// never型
// 発声しえない値の型を表す
function error(message) {
    throw new Error(message);
}
function infiniteLoop() {
    while (true) { }
}
// undefined/null型
let u = undefined;
let n = null;
// object型
// 非プリミティブ型
let objectBrace;
let objectType;
objectBrace = true;
objectBrace = "string";
// union Types
// 複数の型のうち1つの型が成立する
// 下記はどれもなりたつ
let value;
value = false;
value = 1;
value = "string";
// array型に含む要素をunion Typeにしたい
let numberOrStrings;
// let numberOrStrings: (number | string)[];
numberOrStrings = [1, 2, 3, "1", "2", "3"];
// numberOrStrings = [1, 2, 3, "1", "2", "3", true]; // Error!
// Literal Types
// String Literal Types
// 使用する文字列に制限がかけられる
// 意味不明な再代入でこまらない
let myName;
myName = "Masa";
// myName = "tomo"; error!
// Numerical Literal Types
let sosu;
// sosu = 4; // error!
// Boolean Literal Types
let truth;
truth = true;
// truth = false; // error!
// typeofキーワードをつかう
// 宣言済みの変数の型を取得したい
// 型推論とtypeofキーワードで型定義ができる
let asString = "";
let sampleValue;
// console.log(typeof asString); // string
let myObject = { foo: "foo" };
console.log(typeof myObject); // object
let anotherObject = { foo: "bar" }; // foo以外のキーだとエラー
// console.log(keyof Sometype);
let SomeKey;
SomeKey = "foo";
// クラス
// 単純なクラス
// クラスの定義
class Creature {
    constructor() {
        // コンストラクタ無しの場合は初期値を設定
        this.numberOfHands = 0; // 初期値
        this.numberOfHeads = 0; // 初期値
    }
}
let animal = new Creature(); // インスタンスの作成
console.log(animal);
animal.numberOfHands = 1; // クラス変数の更新
console.log("animal numberOfHands: ", animal.numberOfHands);
console.log("animal numberOfHeads: ", animal.numberOfHeads);
// コンストラクタ―ありのクラス
class CreatureWithConstructor {
    constructor(numberOfHands, numberOfHeads) {
        this.numberOfHands = numberOfHands;
        this.numberOfHeads = numberOfHeads;
    }
}
// コンストラクタ―ありは初期値と一緒にインスタンス化する
let creature_instance = new CreatureWithConstructor(0, 0);
console.log(creature_instance);
creature_instance.numberOfHands += 1;
console.log("creature_instance numberOfHands: ", creature_instance.numberOfHands);
console.log("creature_instance numberOfHeads: ", creature_instance.numberOfHeads);
// クラスの継承
// superは親クラスのコンストラクタ―実行
class Dog extends CreatureWithConstructor {
    constructor(bark) {
        super(1, 4); // 親クラスのコンストラクタ―
        this.bark = bark;
    }
    // 子クラスのメソッド
    barking() {
        return `${this.bark}! ${this.bark}!`;
    }
    // 子クラスのメソッド
    shakeTail() {
        console.log(this.barking());
    }
}
const a_dog = new Dog("ワン");
console.log(a_dog);
console.log("a_dog numberOfHands: ", a_dog.numberOfHands);
console.log("a_dog numberOfHeads: ", a_dog.numberOfHeads);
a_dog.shakeTail();
class Human extends CreatureWithConstructor {
    constructor(name) {
        super(1, 2);
        this.name = name;
    }
    greet() {
        return `Hello!, my name is ${this.name}.`;
    }
    shakeHands() {
        console.log(this.greet());
    }
}
const yamada = new Human("yamada");
console.log(yamada);
console.log(yamada["name"]);
console.log(yamada.name);
console.log((yamada.name = "sawada")); // 名前の変更ができてしまう
console.log(yamada);
yamada.shakeHands();
// クラスメンバー修飾子
// public: どのコンテキストでも参照・実行が可能
// private: 同一クラスのみで参照・実行可能
// protected: サブクラスのみに参照・実行可能
class Ningen extends CreatureWithConstructor {
    constructor(name) {
        super(1, 2);
        this.name = name;
    }
    greet() {
        return `Hello! my name is ${this.name}`;
    }
    shakeHands() {
        console.log(this.greet());
    }
}
class Taro extends Ningen {
    constructor() {
        super("Taro");
    }
    printName() {
        console.log(this.name);
    }
    greetfromTaro() {
        console.log(this.greet()); // サブクラスはprotectedは実行可能
    }
}
const taro = new Taro();
console.log(taro);
taro.greetfromTaro();
// console.log(taro.name);
taro.printName();
// 列挙型
// 文字列列挙型と数値列挙型がある
// 数値列挙型
var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 0] = "Up";
    Direction[Direction["Down"] = 1] = "Down";
    Direction[Direction["Left"] = 2] = "Left";
    Direction[Direction["Right"] = 3] = "Right";
})(Direction || (Direction = {}));
const left = Direction.Left;
console.log(left); // 2
// 文字列列挙型
// stringLiteralで初期化する必要がある
var Ports;
(function (Ports) {
    Ports["USER_SERVICE"] = "8080";
    Ports["REGISTER_SERVICE"] = "8081";
    Ports["MEDIA_SERVICE"] = "8888";
})(Ports || (Ports = {}));
console.log(Ports);
console.log(typeof Ports); // object
console.log(Ports.USER_SERVICE);
console.log(typeof Ports.USER_SERVICE); // string
// アサーション
// より強い型定義についてはアサーションをつかって変数への代入を制限することができる
// letとconst
let user1 = "Taro";
let value1 = 0;
let flag1 = true;
// constの型推論はLiteral Typesになり、制限が強いため再代入が不可になる
const user2 = "Taro";
const value2 = 0;
const flag2 = true;
// constで定義した変数をletに代入すると上書きできてしまう
let user3 = user2;
console.log(user3);
user3 = "Jiro";
console.log(user3);
// consteで定義した変数をletに代入しても変更できないようにするには
// アサーションを追加する
const user4 = "Taro";
// const user4: "Taro" = "Taro"
let user5 = user4;
// user5 = "Jiro"; // error! 上書き
// objectのときも同様
const obj1 = {
    foo: false,
    bar: 1,
    baz: "2",
};
const obj2 = {
    foo: false,
    bar: 1,
    baz: "2",
};
obj1["foo"] = true; // constでも型があっていれば可能
// obj2["foo"] = true; // error!
console.log(obj1);
console.log(obj2.baz);
const user6 = {
    name: "user6",
    age: 28,
};
console.log(user6);
let user7 = {
    name: "user7",
};
// // error!
// type User1 = {
//   age: number;
// };
// namespace
var Publisher;
(function (Publisher) {
    Publisher.name = "";
})(Publisher || (Publisher = {}));
const CookingBook = {};
const travelBook = {};
console.log(CookingBook);
console.log(travelBook);
const box0 = { value: "test" }; // defaultが指定されている場合は省略可能
const box1 = { value: "test" };
const box2 = { value: 2 };
const box11 = { value: "test" };
const box12 = { value: 0 };
// const box13: Box1<boolean> = { value: false };
// 関数のGenerics
function Boxed(props) {
    return { value: props };
}
// 関数のGenericsは省略可能
// 引数によって型推定してくれる
const boxed1 = Boxed("name");
const boxed2 = Boxed(2);
const boxed3 = Boxed(false);
const boxed4 = Boxed(null);
// アサーションつきで型を指定できる
const boxed5 = Boxed(null);
console.log(boxed1);
console.log(boxed2);
console.log(boxed3);
console.log(boxed4);
console.log(boxed5);
// extendsで制約を追加する
function Boxed1(props) {
    let _value;
    if (typeof props === "number") {
        _value = props.toFixed();
        return { value: _value };
    }
    else {
        _value = props;
        return { value: _value };
    }
}
const boxed11 = Boxed1("test");
console.log(boxed11);
//# sourceMappingURL=understand_types.js.map