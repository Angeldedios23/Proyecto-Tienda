import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Category } from '../../categories/entities/category.entity';

@Entity('products')  // Asegúrate de que el nombre de la tabla coincide
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column({ nullable: true })
  imageUrl: string;

  @ManyToOne(() => Category, category => category.products)
  @JoinColumn({ name: 'category_id' })  // Especifica la columna de la clave foránea
  category: Category;
}
