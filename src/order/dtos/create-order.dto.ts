import { Type } from "@nestjs/class-transformer";
import { IsArray, IsInt, IsNotEmpty, IsOptional, ValidateNested } from "@nestjs/class-validator";

class OrderProductDto {
  @IsInt()
  @IsNotEmpty()
  productId: number;

  @IsInt()
  @IsNotEmpty()
  orderTypeId: number;

  @IsOptional()
  note?: string;
}

export class CreateOrderDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderProductDto)
  products: OrderProductDto[];
}
