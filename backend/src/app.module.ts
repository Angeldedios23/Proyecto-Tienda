import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module'; 
import { ServeStaticModule } from '@nestjs/serve-static'; 
import { join } from 'path'; 
import { User } from './users/entities/user.entity'; 
import { Product } from './products/entities/product.entity'; 
import { Category } from './categories/entities/category.entity'; 
import { ProductsModule } from './products/products.module'; 
import { CategoriesModule } from './categories/categories.module';
import { OrderModule } from './order/order.module';
import { OrderItemModule } from './order-item/order-item.module';
import { AddressModule } from './address/address.module';
import { Address } from './address/entities/address.entity';
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'frontend'),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3305,
      username: 'root',
      password: '12345',
      database: 'tienda',
      entities: [User, Product, Category, Address],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    ProductsModule,
    CategoriesModule,
    OrderModule,
    OrderItemModule,
    AddressModule,
  ],
})
export class AppModule {}
