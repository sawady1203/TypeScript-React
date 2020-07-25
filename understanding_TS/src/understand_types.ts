// 型の付け方

// 変数に型を定義したい
// 普通に考える型
// 数値型
let price: number = 1000;

// boolean型
let flag: boolean = true;

// string型
let myname: string = "sawada";

// array型
let number_list: number[] = [1, 2, 3];
let number_list2: Array<number> = [4, 5, 6];

// tuple型(要素の数が固定されている)
let x: [string, number] = ["x", 1];
// x = [1, "x"]; //error!

// any型(型が不明な場合に型チェックを不要にする。つかわない)
let whatever: any = 0;
whatever = "name";
whatever = true;

// unknown型
// any型は文字列を数値型の関数に利用できてしまうが
// unknown型は実行時にエラーではじくことができる
// const certainlyNubers: number[] = ["0"]; // error
const maybeNumbers: any[] = ["0", 1];
const probablyNumbers: unknown[] = [1, 2, "3"];
// console.log(maybeNumbers[0].toFixed()); // error!
console.log(maybeNumbers[1].toFixed()); // numberからstringに変換する
// unknownは数値型と型付けしてない場合、実行時エラーになる
// console.log(probablyNumbers[0].toFix()); // Error!

// void型
// 型が全くないことをしめす
// 値を返さない関数の戻り型として利用する
function logger(message: string): void {
  console.log(message);
}

// never型
// 発声しえない値の型を表す
function error(message: string): never {
  throw new Error(message);
}

function infiniteLoop(): never {
  while (true) {}
}

// undefined/null型
let u: undefined = undefined;
let n: null = null;

// object型
// 非プリミティブ型
let objectBrace: {};
let objectType: object;
objectBrace = true;
objectBrace = "string";
// objectType = true; // error
// obejctType = 1; // error

// 高度な型

// Intersection Types
// 複数の型を1つに結合して1つに結合する

type Tail = {
  length: number;
  color: string;
};

type _Dog = {
  tail: Tail;
  bark: () => void;
};

type Kimera = _Dog & Tail;

// union Types
// 複数の型のうち1つの型が成立する
// 下記はどれもなりたつ
let value: boolean | number | string;
value = false;
value = 1;
value = "string";
// array型に含む要素をunion Typeにしたい
let numberOrStrings: Array<number | string>;
// let numberOrStrings: (number | string)[];
numberOrStrings = [1, 2, 3, "1", "2", "3"];
// numberOrStrings = [1, 2, 3, "1", "2", "3", true]; // Error!

// Literal Types

// String Literal Types
// 使用する文字列に制限がかけられる
// 意味不明な再代入でこまらない
let myName: "Masa" | "Masayo" | "Sawa";
myName = "Masa";
// myName = "tomo"; error!

// Numerical Literal Types
let sosu: 1 | 2 | 3 | 5 | 7;
// sosu = 4; // error!

// Boolean Literal Types
let truth: true;
truth = true;
// truth = false; // error!

// typeofキーワードをつかう
// 宣言済みの変数の型を取得したい
// 型推論とtypeofキーワードで型定義ができる
let asString: string = "";
let sampleValue: typeof asString;
// console.log(typeof asString); // string
let myObject = { foo: "foo" };
console.log(typeof myObject); // object
let anotherObject: typeof myObject = { foo: "bar" }; // foo以外のキーだとエラー

//keyof キーワード
// オブジェクトのプロパティ名称をString Literal Union Typesで取得できる
// 型定義のキーをLiteralでとれる
type Sometype = {
  foo: string;
  bar: string;
  baz: string;
  j: true;
};
// console.log(keyof Sometype);
let SomeKey: keyof Sometype;
SomeKey = "foo";

// クラス
// 単純なクラス
// クラスの定義
class Creature {
  // コンストラクタ無しの場合は初期値を設定
  numberOfHands: number = 0; // 初期値
  numberOfHeads: number = 0; // 初期値
}

let animal = new Creature(); // インスタンスの作成
console.log(animal);
animal.numberOfHands = 1; // クラス変数の更新
console.log("animal numberOfHands: ", animal.numberOfHands);
console.log("animal numberOfHeads: ", animal.numberOfHeads);

// コンストラクタ―ありのクラス
class CreatureWithConstructor {
  numberOfHands: number;
  numberOfHeads: number;
  constructor(numberOfHands: number, numberOfHeads: number) {
    this.numberOfHands = numberOfHands;
    this.numberOfHeads = numberOfHeads;
  }
}
// コンストラクタ―ありは初期値と一緒にインスタンス化する
let creature_instance = new CreatureWithConstructor(0, 0);
console.log(creature_instance);
creature_instance.numberOfHands += 1;
console.log(
  "creature_instance numberOfHands: ",
  creature_instance.numberOfHands
);
console.log(
  "creature_instance numberOfHeads: ",
  creature_instance.numberOfHeads
);

// クラスの継承
// superは親クラスのコンストラクタ―実行
class Dog extends CreatureWithConstructor {
  // 子クラスの変数
  bark: string;
  constructor(bark: string) {
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
  name: string;

  constructor(name: string) {
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
  protected readonly name: string;

  constructor(name: string) {
    super(1, 2);
    this.name = name;
  }

  protected greet() {
    return `Hello! my name is ${this.name}`;
  }

  public shakeHands() {
    console.log(this.greet());
  }
}

class Taro extends Ningen {
  constructor() {
    super("Taro");
  }

  public printName() {
    console.log(this.name);
  }

  public greetfromTaro() {
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
enum Direction {
  Up, // enum menber Direction.Up = 0
  Down, // enum menber Direction.Down = 1
  Left, // enum menber Direction.Left = 2
  Right, // enum menber Direction.Right = 3
}

const left = Direction.Left;
console.log(left); // 2

// 文字列列挙型
// stringLiteralで初期化する必要がある
enum Ports {
  USER_SERVICE = "8080",
  REGISTER_SERVICE = "8081",
  MEDIA_SERVICE = "8888",
}

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
const user4 = "Taro" as "Taro";
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
  foo: false as false,
  bar: 1 as 1,
  baz: "2" as "2",
};

obj1["foo"] = true; // constでも型があっていれば可能
// obj2["foo"] = true; // error!

console.log(obj1);
console.log(obj2.baz);

// interfaceによる型のオーバーロード
// openendedに準拠
interface User {
  name: string;
}

interface User {
  age: number;
}

const user6: User = {
  name: "user6",
  age: 28,
};

console.log(user6);

// types aliesはオーバーロードできない
type User1 = {
  name: string;
};

let user7: User1 = {
  name: "user7",
};

// // error!
// type User1 = {
//   age: number;
// };

// namespace

namespace Publisher {
  export const name = "";
  export interface Appearance {
    color: "monochrome" | "4colors" | "fullcolors";
  }
  export interface Book {
    title: string;
    appearance: Appearance;
  }
}

namespace Publisher {
  export interface CookingBook extends Book {
    category: "cooking";
    appearance: Appearance;
  }
}

namespace Publisher {
  export interface Book {
    lang: "ja";
  }
  export interface TrabelBook extends Book {
    category: "travel";
  }
}

const CookingBook: Publisher.CookingBook = {} as Publisher.CookingBook;
const travelBook: Publisher.TrabelBook = {} as Publisher.TrabelBook;
console.log(CookingBook);
console.log(travelBook);

// Generics
// 型の決定を遅らせることができる
// 型における変数のような機能を果たす
// 変数におけるGenerics

// この時点では
// type Box<T> = {
//   value: T;
// };

// defaultの型を指定する
type Box<T = string> = {
  value: T;
};

const box0: Box = { value: "test" }; // defaultが指定されている場合は省略可能
const box1: Box<string> = { value: "test" };
const box2: Box<number> = { value: 2 };

// extendsによる制約

type Box1<T extends string | number> = {
  value: T;
};

const box11: Box1<string> = { value: "test" };
const box12: Box1<number> = { value: 0 };
// const box13: Box1<boolean> = { value: false };

// 関数のGenerics
function Boxed<T>(props: T) {
  return { value: props };
}

// 関数のGenericsは省略可能
// 引数によって型推定してくれる
const boxed1 = Boxed("name");
const boxed2 = Boxed(2);
const boxed3 = Boxed(false);
const boxed4 = Boxed(null);
// アサーションつきで型を指定できる
const boxed5 = Boxed<string | null>(null);
console.log(boxed1);
console.log(boxed2);
console.log(boxed3);
console.log(boxed4);
console.log(boxed5);

// extendsで制約を追加する
function Boxed1<T extends string | number>(props: T) {
  let _value: string | number;
  if (typeof props === "number") {
    _value = props.toFixed();
    return { value: _value };
  } else {
    _value = props;
    return { value: _value };
  }
}

const boxed11 = Boxed1<string>("test");
console.log(boxed11);
