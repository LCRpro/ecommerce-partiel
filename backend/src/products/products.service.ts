import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  findAll() {
    return this.productRepository.find();
  }

  findOne(id: number) {
    return this.productRepository.findOneBy({ id });
  }

  create(product: Partial<Product>) {
    return this.productRepository.save(product);
  }

  update(id: number, product: Partial<Product>) {
    return this.productRepository.update(id, product);
  }

  remove(id: number) {
    return this.productRepository.delete(id);
  }
}
