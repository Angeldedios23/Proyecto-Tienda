import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderItem } from './entities/order-item.entity';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
  ) {}

  // Método para crear un item de orden
  async create(orderItem: Partial<OrderItem>): Promise<OrderItem> {
    const newItem = this.orderItemRepository.create(orderItem);
    return this.orderItemRepository.save(newItem);
  }

  // Método para obtener items por orden
  async findByOrder(orderId: number): Promise<OrderItem[]> {
    return this.orderItemRepository.find({ where: { order: { id: orderId } } });
  }
}
