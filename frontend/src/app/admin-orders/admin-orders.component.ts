import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-orders',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnInit {
  orders: any[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getAllOrders().subscribe({
      next: (data) => {
        console.log('✅ Commandes récupérées :', data);  // ✅ Log pour vérifier les données
        this.orders = data;
      },
      error: (err) => {
        console.error('❌ Erreur lors de la récupération des commandes :', err);  // ✅ Gestion des erreurs
      }
    });
  }

  updateStatus(orderId: number, status: string): void {
    this.orderService.updateOrderStatus(orderId, status).subscribe({
      next: () => {
        alert(`✅ Statut de la commande #${orderId} mis à jour en ${status}`);
        this.loadOrders();  // ✅ Recharge les commandes après mise à jour
      },
      error: (err) => {
        console.error('❌ Erreur lors de la mise à jour du statut :', err);
      }
    });
  }
}
