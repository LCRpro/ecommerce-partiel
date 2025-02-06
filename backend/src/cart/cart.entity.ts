import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from 'src/product/product.entity';
import { User } from 'src/users/user.entity';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @ManyToOne(() => User)  // ✅ Relation avec l'utilisateur
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  productId: number;

  @ManyToOne(() => Product)  // ✅ Relation avec le produit
  @JoinColumn({ name: 'productId' })
  product: Product;

  @Column()
  quantity: number;
}
