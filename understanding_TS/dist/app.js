"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
class Product {
    constructor(name, unitPrice) {
        this.name = name;
        this.unitPrice = unitPrice;
    }
}
exports.Product = Product;
class ProductWithDiscountCodes extends Product {
    constructor(name, unitPrice) {
        super(name, unitPrice);
        this.name = name;
        this.unitPrice = unitPrice;
    }
}
class OrderDetail {
    constructor(product, quantity = 1, deleted) {
        (this.product = product),
            (this.quantity = quantity),
            (this.deleted = deleted);
    }
    delete() {
        this.deleted = true;
    }
    getTotal(discount) {
        const priceWithoutDiscount = this.product.unitPrice * this.quantity;
        const discountAmount = priceWithoutDiscount * (discount || 0);
        return priceWithoutDiscount - discountAmount;
    }
}
const table = {
    name: "Table",
    unitPrice: 100,
    discountCodes: [
        { code: "summer10", percentage: 0.1 },
        { code: "BERI", percentage: 0.2 },
    ],
};
//# sourceMappingURL=app.js.map