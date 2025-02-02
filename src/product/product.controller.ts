import { Controller, Post, Get, Patch, Param, Body, NotFoundException } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dtos/create-product.dto';
import { Product } from './product.entity';
import { UpdateProductStatusDto } from './dtos/update-product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productService.createProduct(createProductDto);
  }

  @Get()
  async getAvailableProducts(): Promise<Product[]> {
    return this.productService.getAvailableProducts();
  }

  @Get(':id')
  async getProductById(@Param('id') id: number): Promise<Product> {
    return this.productService.getProductById(id);
  }

  @Patch(':id/status')
  async updateProductStatus(
    @Param('id') id: number,
    @Body() updateProductStatusDto: UpdateProductStatusDto
  ): Promise<Product> {
    return this.productService.updateProductStatus(id, updateProductStatusDto);
  }
}
