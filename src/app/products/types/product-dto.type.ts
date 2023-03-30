import { UUIDDto } from '../../types/uuid-dto.type';

export interface ProductsDto extends UUIDDto {
  name: string;
  description: string;
  image: string;
  price: number;
  quantity: number;
  brand: string;
  categoryId: number;
}