import { CategoriesType } from "../CategoriesType";
import { ProductsType } from "../ProductsType";
import { CategoryType } from "./Categories";
import { CatalogHeaderType } from "./Header";
import { HeroType } from "./Hero";

export interface Catalog {
    header: CatalogHeaderType;
    hero: HeroType;
    // queue: queue;
    category: CategoryType;
    categories: CategoriesType[];
    // product: product;
    products: ProductsType[];
}