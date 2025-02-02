import { Type } from "@nestjs/class-transformer";
import { IsArray, IsInt, IsNotEmpty, IsOptional, ValidateNested } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";

class OrderProductDto {
  @IsInt()
  @IsNotEmpty()
  @ApiProperty({ description: 'product id' })
  productId: number;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({ description: 'id of order type' })
  orderTypeId: number;

  @IsOptional()
  @ApiProperty({ description: 'note against each product when creating the order' })
  note?: string;
}

export class CreateOrderDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderProductDto)
  @ApiProperty({ description: 'array of products for creating this order' })
  products: OrderProductDto[];
}
