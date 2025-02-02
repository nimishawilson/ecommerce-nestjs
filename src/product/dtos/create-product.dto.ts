import { Type } from "@nestjs/class-transformer";
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";

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
  @ApiProperty({ description: 'The name of the product' })
  name: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'A description of the product', nullable: true })
  note?: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'The price of the product' })
  price: number;

  @ValidateNested()
  @ApiProperty({ description: 'source location of product' })
  @Type(() => SourceLocationDto)
  sourceLocation: SourceLocationDto;

  @ValidateNested()
  @ApiProperty({ description: 'manufacturer details of the product' })
  @Type(() => ManufacturerDto)
  manufacturer: ManufacturerDto;
}
