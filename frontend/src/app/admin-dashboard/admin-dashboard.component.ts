import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product, Order } from '../models/admin.model'; // ✅ Import des modèles

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  products: Product[] = [];
  orders: Order[] = [];

  newProduct: Product = {
    id: 0,
    name: '',
    price: 0,
    stock: 0,
    imageUrl: '',
    description: ''
  };

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.adminService.getDashboardData().subscribe({
      next: (data) => {
        this.products = data.products;
        this.orders = data.orders;
      },
      error: (error) => {
        console.error('❌ Erreur lors de la récupération des données :', error);
      }
    });
  }

  // ✅ Ajouter un produit
  addProduct(): void {
    this.adminService.addProduct(this.newProduct).subscribe(() => {
      this.newProduct = { id: 0, name: '', price: 0, stock: 0 };
      this.loadDashboardData();
    });
  }

  // ✅ Activer le mode édition
  enableEdit(product: Product): void {
    product.isEditing = true;
  }

  // ✅ Annuler l'édition
  cancelEdit(product: Product): void {
    product.isEditing = false;
    this.loadDashboardData();
  }

  updateProduct(product: Product): void {
    console.log('🔄 Données du produit à mettre à jour :', product);  // ✅ Debug
    this.adminService.updateProduct(product.id, product).subscribe({
      next: () => {
        product.isEditing = false;
        this.loadDashboardData();
      },
      error: (error) => {
        console.error('❌ Erreur lors de la mise à jour du produit :', error);
      }
    });
  }
  errorMessage: string | null = null;  // ✅ Initialisation de la variable d'erreur


  // ✅ Supprimer un produit
// ✅ Supprimer un produit
deleteProduct(id: number): void {
  this.adminService.deleteProduct(id).subscribe({
    next: () => {
      this.loadDashboardData();
    },
    error: (error) => {
      console.error('❌ Erreur lors de la suppression du produit :', error);
      this.errorMessage = error.error.message || 'Erreur lors de la suppression du produit.'; // ✅ Capture le message d'erreur
    }
  });
}


  // ✅ Mettre à jour le statut d'une commande
  updateStatus(orderId: number, status: 'En cours' | 'Expédiée' | 'Annulée'): void {
    this.adminService.updateOrderStatus(orderId, status).subscribe(() => {
      alert(`Statut de la commande #${orderId} mis à jour en ${status}`);
      this.loadDashboardData();
    });
  }
}
