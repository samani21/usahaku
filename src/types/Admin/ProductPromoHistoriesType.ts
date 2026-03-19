import { BusinessType } from "./BusinessType";

export interface ProductPromoHistoryType {
    id: number;
    business_id: number;
    product_id: number;
    percent: number;
    price: number;
    is_global: number;
    status: number;
    name_promo: string;
    type: string;
    created_at: string;
    updated_at: string;
    name_product: string;
    business: BusinessType;
}