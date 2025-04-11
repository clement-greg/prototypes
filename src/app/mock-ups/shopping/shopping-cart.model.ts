export class ShoppingCart {

    cartItems: ShoppingCartItem[] = [];
    cashOutAmount = 675;

    static instance: ShoppingCart;
    static getCart(): ShoppingCart {
        if (!ShoppingCart.instance) {
            ShoppingCart.instance = new ShoppingCart();
            ShoppingCart.instance.cartItems = [];
        }
        return ShoppingCart.instance;
    }
}

export class ShoppingCartItem {
    name: string;
    amount: number;
    item: any;
    quantity = 1;
}