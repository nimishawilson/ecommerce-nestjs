import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { Product } from 'src/product/product.entity';
import { OrderType } from 'src/order-type/order-type.entity';
import { OrderProduct } from 'src/order-product/order-product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Product, OrderType, OrderProduct])],
  providers: [OrderService],
  controllers: [OrderController]
})
export class OrderModule {}
