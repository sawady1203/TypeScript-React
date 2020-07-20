class Product {
  readonly name: string;
  unitPrice: number;
  constructor(name: string, unitPrice: number) {
    this.name = name;
    this.unitPrice = unitPrice;
  }
}

interface DiscountCode {
  code: string;
  percentage: number;
}

class ProductWithDiscountCodes extends Product {
  constructor(public name: string, public unitPrice: number) {
    super(name, unitPrice);
  }
  discountCodes!: DiscountCode[];
}

type GetTotal = (discount: number) => number;

interface IOrderDetail {
  product: Product;
  quantity: number;
  getTotal(discount: number): number;
}

class OrderDetail implements IOrderDetail {
  public product: Product;
  public quantity: number;
  private deleted: boolean;

  public delete(): void {
    this.deleted = true;
  }
  constructor(product: Product, quantity: number = 1, deleted: boolean) {
    (this.product = product),
      (this.quantity = quantity),
      (this.deleted = deleted);
  }
  getTotal(discount: number): number {
    const priceWithoutDiscount = this.product.unitPrice * this.quantity;
    const discountAmount = priceWithoutDiscount * (discount || 0);
    return priceWithoutDiscount - discountAmount;
  }
}

const table: ProductWithDiscountCodes = {
  name: "Table",
  unitPrice: 100,
  discountCodes: [
    { code: "summer10", percentage: 0.1 },
    { code: "BERI", percentage: 0.2 },
  ],
};

// const tableOrder: OrderDetail = {
//   product: table,
//   quantity: 1,
//   getTotal(discountPrice: number): number {
//     const priceWithoutDiscount = this.product.unitPrice * this.quantity;
//     const discountAmount = priceWithoutDiscount * (discountPrice || 0);
//     return priceWithoutDiscount - discountAmount;
//   },
// };

// console.log(table.name);
// console.log(tableOrder.product);

// readonlyは変更できない
// table.name = "another table";

// const orderdetail = new OrderDetail();
// orderdetail.name = "Table";

export { Product };
