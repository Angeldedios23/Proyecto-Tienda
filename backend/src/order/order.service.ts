import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from '../order-item/entities/order-item.entity';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
  ) {}

  async createOrder(userId: number, createOrderDto: CreateOrderDto) {
    const { total, address, items } = createOrderDto;

    // Crear la orden
    const order = new Order();
    order.userId = userId;
    order.total = total;
    order.address = address;
    order.createdAt = new Date();

    const savedOrder = await this.orderRepository.save(order);

    // Crear los items de la orden
    const orderItems = items.map(item => {
      const orderItem = new OrderItem();
      orderItem.order = savedOrder;
      orderItem.productId = item.productId;
      orderItem.quantity = item.quantity;
      orderItem.price = item.price;
      return orderItem;
    });

    await this.orderItemRepository.save(orderItems);

    return savedOrder;
  }
}
