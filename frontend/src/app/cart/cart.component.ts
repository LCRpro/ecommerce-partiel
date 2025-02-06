import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { CommonModule } from '@angular/common';  // ✅ Import du CommonModule

@Component({
  selector: 'app-cart',
  standalone: true,  // ✅ Si tu utilises des composants standalone
  imports: [CommonModule],  // ✅ Ajout de CommonModule ici
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cart: any[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cartService.getCart().subscribe({
      next: (data) => {
        console.log('✅ Données du panier récupérées:', data);
        this.cart = data;
      },
      error: (err) => {
        console.error('❌ Erreur lors de la récupération du panier:', err);
      }
    });
  }

  removeFromCart(productId: number): void {
    this.cartService.removeFromCart(productId).subscribe(() => {
      this.loadCart();
    });
  }

  validateOrder(): void {
    this.cartService.validateOrder().subscribe(() => {
      alert('Commande validée !');
      this.loadCart();
    });
  }
}
