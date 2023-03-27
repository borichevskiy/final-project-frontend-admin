import { UUIDDto } from '../../types/uuid-dto.type';

export interface ProductsDto extends UUIDDto {
  name?: string;
  description?: string;
  price?: number;
  quantity?: number;
  brand?: string;
  categoryName?: string;
}