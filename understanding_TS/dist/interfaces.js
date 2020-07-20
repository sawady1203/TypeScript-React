"use strict";
// interface Product {
//   readonly name: string;
//   unitPrice: number;
// }
// interface DiscountCode {
//   code: string;
//   percentage: number;
// }
// interface ProductWithDiscountCodes extends Product {
//   discountCodes: DiscountCode[];
// }
// type GetTotal = (discount: number) => number;
// interface OrderDetail {
//   product: Product;
//   quantiry: number;
//   dateAdeed?: Date;
//   getTotal: GetTotal;
// }
// const table: ProductWithDiscountCodes = {
//   name: "Table",
//   unitPrice: 100,
//   discountCodes: [
//     { code: "summer10", percentage: 0.1 },
//     { code: "BERI", percentage: 0.2 },
//   ],
// };
// const tableOrder: OrderDetail = {
//   product: table,
//   quantiry: 1,
//   getTotal(discountPrice: number): number {
//     const priceWithoutDiscount = this.product.unitPrice * this.quantiry;
//     const discountAmount = priceWithoutDiscount * (discountPrice || 0);
//     return priceWithoutDiscount - discountAmount;
//   },
// };
// console.log(table.name);
// console.log(tableOrder.product);
// // readonlyは変更できない
// // table.name = "another table";
//# sourceMappingURL=interfaces.js.map