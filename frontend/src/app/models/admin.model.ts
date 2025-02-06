// src/app/models/admin.model.ts

export interface Product {
    id: number;
    name: string;
    price: number;
    stock: number;
    imageUrl?: string;
    description?: string;
    isEditing?: boolean; // ✅ Propriété facultative pour le mode édition
  }
  
  export interface OrderItem {
    id: number;
    orderId: number;
    productId: number;
    quantity: number;
    price: number;
  }
  
  export interface Order {
    id: number;
    userId: number;
    status: 'En cours' | 'Expédiée' | 'Annulée';
    createdAt: string;
    updatedAt: string;
    items: OrderItem[];
  }
  