import { Component, OnInit } from '@angular/core';
import { ProductService, Product } from '../product.service';
import { CartService } from '../cart.service';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  newProduct: Product = { name: '', description: '', price: 0, stock: 0, imageUrl: '' };
  isEditing: boolean = false;
  selectedProductId: number | null = null;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  //  console.log('ProductComponent chargé ✅');
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data.map(product => ({ ...product, quantity: 1 }));
    });
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();  // ✅ Vérifie la connexion
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

  addToCart(product: Product, quantity: number): void {
    const userId = this.authService.getUserId();  // ✅ Récupère l'ID de l'utilisateur connecté

    if (!product.id) {
      console.error('ID du produit manquant.');
      return;
    }

    this.cartService.addToCart({
      productId: product.id,
      quantity: quantity || 1
    }).subscribe(() => {
      alert(`${quantity} x ${product.name} ajouté au panier.`);
    });
  }
}
