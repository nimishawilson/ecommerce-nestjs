import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { SourceLocation } from 'src/source-location/source-location.entity';
import { Manufacturer } from 'src/manufacturer/manufacturer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, SourceLocation, Manufacturer])],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
