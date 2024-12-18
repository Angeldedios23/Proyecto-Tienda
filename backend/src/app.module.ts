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
      rootPath: join(__dirname, '..', 'frontend', 'build'), // Ajusta esta ruta si es necesario
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST || 'db',
      port: parseInt(process.env.DATABASE_PORT, 10) || 3306, // Cambiado al puerto estándar
      username: process.env.DATABASE_USER || 'root',
      password: process.env.DATABASE_PASSWORD || '12345',
      database: process.env.DATABASE_NAME || 'tienda',
      entities: [User, Product, Category, Address],
      synchronize: true, // Solo para desarrollo. Desactívalo en producción
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
