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
console.log(maybeNumbers[0].toFix());
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
// objectType = true; // error
// obejctType = 1; // error
//# sourceMappingURL=class_base.js.map