import { CategoriesType } from "../CategoriesType";
import { ProductsType } from "../ProductsType";
import { CatalogHeaderType } from "./Header";

export interface Catalog {
    header: CatalogHeaderType;
    // hero: ResHero;
    // queue: queue;
    // category: categorie;
    categories: CategoriesType[];
    // product: product;
    products: ProductsType[];
}