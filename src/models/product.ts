/**
 * Interface model for product
 */
export interface Product {
    /**
     * Unique id for the product
     */
    id: number;
    /**
     * Name/Title of the product 
     */
    title: string;
    /**
     * Description text for the product 
     */
    description: string;
    /**
     * Price of the product
     */
    price: number;
    /**
     * Path for the product image
     */
    imagePath: string;
}