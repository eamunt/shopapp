import { Category } from 'src/app/models/category';

export interface CategoryListReponse {
    categories: Category[];
    totalPages: number;
}
