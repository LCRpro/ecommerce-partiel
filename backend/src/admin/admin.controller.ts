import { Controller, Get, Post, Put, Delete, Body, Param, BadRequestException } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // ✅ Gestion des Produits
  @Get('products')
  getAllProducts() {
    return this.adminService.getAllProducts();
  }

  @Post('products')
  createProduct(@Body() productData: any) {
    return this.adminService.createProduct(productData);
  }

  @Put('products/:id')
  updateProduct(@Param('id') id: number, @Body() productData: any) {
    return this.adminService.updateProduct(id, productData);
  }
  
  @Delete('products/:id')
  deleteProduct(@Param('id') id: number) {
    return this.adminService.deleteProduct(id);  // ✅ Utilise AdminService
  }

  // ✅ Gestion des Commandes
  @Get('orders')
  getAllOrders() {
    return this.adminService.getAllOrders();
  }

  @Put('orders/:id/status')
  updateOrderStatus(
    @Param('id') id: number,
    @Body() statusData: { status: 'En cours' | 'Expédiée' | 'Annulée' }
  ) {
    const validStatuses = ['En cours', 'Expédiée', 'Annulée'];

    if (!validStatuses.includes(statusData.status)) {
      throw new BadRequestException('Statut de commande invalide');
    }

    return this.adminService.updateOrderStatus(id, statusData.status);
  }


  @Get('all')  // ✅ Nouvelle route
  async getDashboardData() {
    const products = await this.adminService.getAllProducts();
    const orders = await this.adminService.getAllOrders();
    return { products, orders };  // ✅ Retourne des tableaux
  }
}


