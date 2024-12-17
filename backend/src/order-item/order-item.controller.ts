import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { OrderItemService } from './order-item.service';
import { OrderItem } from './entities/order-item.entity';

@Controller('order-items')
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}

  @Post()
  async create(@Body() createOrderItemDto: Partial<OrderItem>): Promise<OrderItem> {
    return this.orderItemService.create(createOrderItemDto);
  }

  @Get(':orderId')
  async findByOrder(@Param('orderId') orderId: number): Promise<OrderItem[]> {
    return this.orderItemService.findByOrder(orderId);
  }
}
