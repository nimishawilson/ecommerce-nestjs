import { Controller, Post, Get, Patch, Param, Body, NotFoundException } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dtos/create-product.dto';
import { Product } from './product.entity';
import { UpdateProductStatusDto } from './dtos/update-product.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('products')  // Tag to organize the endpoints in Swagger UI
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOperation({ summary: 'Create a new product' })
  @ApiBody({ type: CreateProductDto }) 
  @ApiResponse({
    status: 201,
    description: 'Successfully created the product',
  })
  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productService.createProduct(createProductDto);
  }

  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the list of products',
  })
  @Get()
  async getAvailableProducts(): Promise<Product[]> {
    return this.productService.getAvailableProducts();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get product by id' })
  async getProductById(@Param('id') id: number): Promise<Product> {
    return this.productService.getProductById(id);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update the status of a product' })
  @ApiBody({ type: UpdateProductStatusDto }) 
  async updateProductStatus(
    @Param('id') id: number,
    @Body() updateProductStatusDto: UpdateProductStatusDto
  ): Promise<Product> {
    return this.productService.updateProductStatus(id, updateProductStatusDto);
  }
}
