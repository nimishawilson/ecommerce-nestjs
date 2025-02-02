import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { Order } from './order/order.entity';
import { Product } from './product/product.entity';
import { OrderType } from './order-type/order-type.entity';
import { OrderProduct } from './order-product/order-product.entity';
import { SourceLocation } from './source-location/source-location.entity';
import { Manufacturer } from './manufacturer/manufacturer.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'ecommerce.sqlite',
      entities: [Order, Product, OrderType, OrderProduct, SourceLocation, Manufacturer],
      synchronize: true
    }),
    ProductModule,
    OrderModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
