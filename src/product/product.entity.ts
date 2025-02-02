import { Manufacturer } from "src/manufacturer/manufacturer.entity";
import { OrderProduct } from "src/order-product/order-product.entity";
import { SourceLocation } from "src/source-location/source-location.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export type ProductStatus = 'available' | 'sold out';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  note: string;

  @Column('decimal')
  price: number;

  @ManyToOne(() => SourceLocation, (sourceLocation) => sourceLocation.products)
  sourceLocation: SourceLocation;

  @ManyToOne(() => Manufacturer, (manufacturer) => manufacturer.products)
  manufacturer: Manufacturer;

  @Column({ type: 'varchar', default: 'available' })
  status: ProductStatus; // Store status as a string

  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.product)
  orderProducts: OrderProduct[];
}
