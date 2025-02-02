import { Type } from "@nestjs/class-transformer";
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "@nestjs/class-validator";

class SourceLocationDto {
  @IsInt()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;
}

class ManufacturerDto {
  @IsInt()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;
}

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  note?: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ValidateNested()
  @Type(() => SourceLocationDto)
  sourceLocation: SourceLocationDto;

  @ValidateNested()
  @Type(() => ManufacturerDto)
  manufacturer: ManufacturerDto;
}
