import { CategoriesType } from "./CategoriesType";
import { ProductsType } from "./ProductsType";

export interface Catalog {
    // header: ResHeader;
    // hero: ResHero;
    // queue: queue;
    // category: categorie;
    categories: CategoriesType[];
    // product: product;
    products: ProductsType[];
}