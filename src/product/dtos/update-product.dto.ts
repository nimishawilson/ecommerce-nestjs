import { IsEnum, IsNotEmpty } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";

export enum ProductStatus {
  AVAILABLE = 'available',
  SOLD_OUT = 'sold out',
}

export class UpdateProductStatusDto {
  @ApiProperty({ description: 'status of the product. Either "available" or "sold out"' })
  @IsEnum(ProductStatus, { message: 'Status must be either "available" or "sold out"' })
  @IsNotEmpty()
  status: ProductStatus;
}
