import { OrderType } from "src/order-type/order-type.entity";
import { Order } from "src/order/order.entity";
import { Product } from "src/product/product.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('order_products')
export class OrderProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, (order) => order.orderProducts)
  order: Order;

  @ManyToOne(() => Product, (product) => product.orderProducts)
  product: Product;

  @ManyToOne(() => OrderType, (orderType) => orderType)
  orderType: OrderType;

  @Column({ nullable: true })
  note: string;
}
