import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;  // (sera hashé)

  @Column({ default: 'client' })  // ✅ Par défaut, le rôle est "client"
  role: 'admin' | 'client';
}
