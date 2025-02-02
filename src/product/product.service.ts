import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dtos/create-product.dto';
import { ProductStatus, UpdateProductStatusDto } from './dtos/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  // ✅ Create a new product
  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create({
      ...createProductDto,
      status: ProductStatus.AVAILABLE, // New products are available by default
    });

    return this.productRepository.save(product);
  }

  // ✅ Get all available products
  async getAvailableProducts(): Promise<Product[]> {
    return this.productRepository.find({
      where: { status: ProductStatus.AVAILABLE },
      relations: ['sourceLocation', 'manufacturer'], // Include related entities
    });
  }

  // ✅ Get a product by ID
  async getProductById(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['sourceLocation', 'manufacturer'],
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  // ✅ Update product status (available/sold out)
  async updateProductStatus(id: number, updateProductStatusDto: UpdateProductStatusDto): Promise<Product> {
    const product = await this.getProductById(id);

    if (product.status === ProductStatus.SOLD_OUT && updateProductStatusDto.status === ProductStatus.AVAILABLE) {
      throw new BadRequestException('A sold-out product cannot be made available again.');
    }

    product.status = updateProductStatusDto.status;
    return this.productRepository.save(product);
  }
}
