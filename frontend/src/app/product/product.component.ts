import { Component, OnInit } from '@angular/core';
import { ProductService, Product } from '../product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';  // ✅ Import du module

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],  // ✅ Ajout de HttpClientModule ici
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  newProduct: Product = { name: '', description: '', price: 0, stock: 0, imageUrl: '' };
  isEditing: boolean = false;
  selectedProductId: number | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(data => this.products = data);
  }

  addProduct(): void {
    if (this.isEditing && this.selectedProductId !== null) {
      this.productService.updateProduct(this.selectedProductId, this.newProduct).subscribe(() => {
        this.resetForm();
        this.loadProducts();
      });
    } else {
      this.productService.addProduct(this.newProduct).subscribe(() => {
        this.resetForm();
        this.loadProducts();
      });
    }
  }

  editProduct(product: Product): void {
    this.newProduct = { ...product };
    this.selectedProductId = product.id!;
    this.isEditing = true;
  }

  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe(() => this.loadProducts());
  }

  resetForm(): void {
    this.newProduct = { name: '', description: '', price: 0, stock: 0, imageUrl: '' };
    this.isEditing = false;
    this.selectedProductId = null;
  }
}
