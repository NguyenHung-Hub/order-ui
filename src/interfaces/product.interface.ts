import { ICategory } from './category.interface';
import { ITimeStamps } from './index.interface';

export interface IProduct extends ITimeStamps {
    _id?: string;
    name: string;
    description: string;
    photo: string;
    category: string;
    slug: string;
    quantity: number;
    priceSale: number;
    priceOrigin: number;
    soldOut: boolean;
    hidden: boolean;
}

export interface IProductsByCategories extends ICategory {
    products: IProduct[];
}
