import { Controller, Post, Body, Req, BadRequestException } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto, @Req() req) {
    const userId = req.user.id; // Obtener el ID del usuario autenticado
    return this.orderService.createOrder(userId, createOrderDto);
  }
}
