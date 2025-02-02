import { IsEnum, IsNotEmpty } from "@nestjs/class-validator";

export enum ProductStatus {
  AVAILABLE = 'available',
  SOLD_OUT = 'sold out',
}

export class UpdateProductStatusDto {
  @IsEnum(ProductStatus, { message: 'Status must be either "available" or "sold out"' })
  @IsNotEmpty()
  status: ProductStatus;
}
