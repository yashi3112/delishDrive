export interface CartItem {
    /**
     * Unique id of the cart items
     */
    id: number;
    /**
     * Id of associated product 
     */
    productId: number;
    /**
     * Number of quantity of corresponding product in cart
     */
    quantity: number;
}