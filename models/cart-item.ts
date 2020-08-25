export class CartItem {
    constructor(
        public quantity: number,
        public price: number,
        public title: string,
        public sum: number,
    ) {}
}

export class ExpandedCartItem extends CartItem {
    constructor(
        public productId: string,
        quantity: number,
        price: number,
        title: string,
        sum: number,
    ) {
        super(quantity, price, title, sum);

    }
}
