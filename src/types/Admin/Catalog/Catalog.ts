import { CategoriesType } from "../CategoriesType";
import { ProductsType } from "../ProductsType";
import { CatalogHeaderType } from "./Header";
import { HeroType } from "./Hero";

export interface Catalog {
    header: CatalogHeaderType;
    hero: HeroType;
    // queue: queue;
    // category: categorie;
    categories: CategoriesType[];
    // product: product;
    products: ProductsType[];
}