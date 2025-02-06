import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'postgres', // Nom du service PostgreSQL dans Docker Compose
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
      username: process.env.DB_USERNAME || 'admin',    // Correspond à POSTGRES_USER
      password: process.env.DB_PASSWORD || 'password', // Correspond à POSTGRES_PASSWORD
      database: process.env.DB_DATABASE || 'ecommerce', // Correspond à POSTGRES_DB
      autoLoadEntities: true,
      synchronize: true,
    }),
    ProductModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
