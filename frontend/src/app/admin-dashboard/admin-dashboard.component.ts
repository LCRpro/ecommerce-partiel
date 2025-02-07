import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AdminService } from '../admin.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product, Order } from '../models/admin.model'; // ✅ Import des modèles
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';


@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, NgChartsModule],
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
  chartType: ChartType = 'pie'; 

  chartData: ChartConfiguration['data'] = {
    labels: [],
    datasets: [
      {
        label: 'Ventes des produits',
        data: [],
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'
        ],
        hoverOffset: 4
      }
    ]
  };
  showStats = false; // ✅ Contrôle de l'affichage des stats

  chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom'
      }
    }
  };

  constructor(private adminService: AdminService,private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.adminService.getDashboardData().subscribe({
      next: (data) => {
        this.products = data.products;
        this.orders = data.orders;
        this.calculateProductSales();
        this.changeDetectorRef.detectChanges();
      },
      error: (error) => {
        console.error('❌ Erreur lors de la récupération des données :', error);
      }
    });
  }

  calculateProductSales(): void {
    const salesMap: { [key: string]: number } = {};

    this.orders.forEach(order => {
      order.items.forEach(item => {
        const productName = this.products.find(p => p.id === item.productId)?.name || `Produit #${item.productId}`;
        salesMap[productName] = (salesMap[productName] || 0) + item.quantity;
      });
    });

    this.chartData.labels = Object.keys(salesMap);
    this.chartData.datasets[0].data = Object.values(salesMap);

    this.changeDetectorRef.detectChanges();
  }

  toggleStats(): void {
    this.showStats = !this.showStats; // ✅ Inversion de l'état d'affichage
    if (this.showStats) {
      this.calculateProductSales(); // ✅ Mise à jour des données si nécessaire
    }
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
    // console.log('🔄 Données du produit à mettre à jour :', product);  
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
