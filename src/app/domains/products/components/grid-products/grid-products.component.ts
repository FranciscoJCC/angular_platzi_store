import { Component, Input, inject } from '@angular/core';
import { Product } from '@shared/models/product.model';
import { ProductComponent } from '@products/components/product/product.component';
import { CartService } from '../../../shared/services/cart.service';

@Component({
  selector: 'app-grid-products',
  standalone: true,
  imports: [ProductComponent],
  templateUrl: './grid-products.component.html',
  styleUrl: './grid-products.component.css'
})

export class GridProductsComponent {
  @Input() products? : Array<Product>;

  //services
  private CartService = inject(CartService);

  addtToCart(product: Product) {
    console.log("add product");
    this.CartService.addToCart(product);
  }
}
