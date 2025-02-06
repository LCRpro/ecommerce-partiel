import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { AuthService } from '../auth.service';  // ✅ Import du AuthService
import { CommonModule } from '@angular/common';  // ✅ Import pour ngFor et ngIf

@Component({
  selector: 'app-client-orders',
  standalone: true,  // ✅ Composant standalone
  imports: [CommonModule],  // ✅ Ajout du CommonModule
  templateUrl: './client-orders.component.html',
  styleUrls: ['./client-orders.component.scss']
})
export class ClientOrdersComponent implements OnInit {
  orders: any[] = [];

  constructor(private orderService: OrderService, private authService: AuthService) {}  // ✅ Injection du AuthService

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    const userId = this.authService.getUserId();  // ✅ Récupération de l'ID utilisateur
    console.log('🔍 Récupération des commandes pour l\'utilisateur ID:', userId);  // ✅ Log pour le debug
    this.orderService.getOrdersByUser(userId).subscribe({
      next: (data) => {
        console.log('✅ Commandes récupérées:', data);  // ✅ Vérification des données
        this.orders = data;
      },
      error: (err) => {
        console.error('❌ Erreur lors de la récupération des commandes:', err);
      }
    });
  }
}
