import { Component } from '@angular/core';
import { ProductComponent } from './product/product.component';
import { HttpClientModule } from '@angular/common/http';  // ✅ Import du module

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProductComponent, HttpClientModule],  // ✅ Ajout ici
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ecommerce-frontend';
}
