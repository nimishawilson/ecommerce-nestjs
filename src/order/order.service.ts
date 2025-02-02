import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dtos/create-order.dto';
import { Order } from './order.entity';
import { Product } from 'src/product/product.entity';
import { OrderProduct } from 'src/order-product/order-product.entity';
import { OrderType } from 'src/order-type/order-type.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(OrderProduct)
    private readonly orderProductRepository: Repository<OrderProduct>,

    @InjectRepository(OrderType)
    private readonly orderTypeRepository: Repository<OrderType>,
  ) {}

  /**
   * Create a new order with products.
   * Ensures that only available products can be ordered.
   * Marks ordered products as "sold out".
   */
  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const { products } = createOrderDto;

    // Fetch all requested products from the database
    const productEntities = await this.productRepository.findByIds(
      products.map((p) => p.productId),
    );

    if (productEntities.length !== products.length) {
      throw new BadRequestException('Some products were not found.');
    }

    // Check if all products are available
    for (const product of productEntities) {
      if (product.status === 'sold out') {
        throw new BadRequestException(`Product ${product.name} is already sold out.`);
      }
    }

    // Create Order
    const order = this.orderRepository.create();
    await this.orderRepository.save(order);

    // Create OrderProduct records and update product status
    for (const { productId, orderTypeId, note } of products) {
      const product = await this.productRepository.findOne({ where: { id: productId } });
      const orderType = await this.orderTypeRepository.findOne({ where: { id: orderTypeId } });

      if (!product || !orderType) {
        throw new BadRequestException('Invalid product or order type.');
      }

      const orderProduct = this.orderProductRepository.create({
        order,
        product,
        orderType,
        note,
      });

      await this.orderProductRepository.save(orderProduct);

      // Update product status to 'sold out'
      product.status = 'sold out';
      await this.productRepository.save(product);
    }

    return order;
  }

  /**
   * Retrieve all orders with associated products and details.
   */
  async getAllOrders(): Promise<Order[]> {
    return this.orderRepository.find({
      relations: ['orderProducts', 'orderProducts.product', 'orderProducts.orderType'],
    });
  }

  /**
   * Retrieve a single order by ID, including all products in that order.
   */
  async getOrderById(id: number): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['orderProducts', 'orderProducts.product', 'orderProducts.orderType'],
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found.`);
    }

    return order;
  }
}
