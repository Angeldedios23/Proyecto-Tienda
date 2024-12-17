import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { ProductsModule } from '../products/products.module';  // Importar el ProductsModule

@Module({
  imports: [TypeOrmModule.forFeature([Category]), ProductsModule],  // Agregar ProductsModule aquí
  providers: [CategoriesService],
  controllers: [CategoriesController],
})
export class CategoriesModule {}
