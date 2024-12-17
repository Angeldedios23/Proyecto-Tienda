import { IsArray, IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsNumber()
  total: number;

  @IsString()
  address: string;

  @IsArray()
  items: {
    productId: number;
    quantity: number;
    price: number;
  }[];
}
