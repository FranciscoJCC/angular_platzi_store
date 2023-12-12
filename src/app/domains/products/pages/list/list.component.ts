import { Component, inject, signal } from '@angular/core';

import { ProductComponent } from '@products/components/product/product.component';
import { Product } from '@shared/models/product.model';
import { HeaderComponent } from '@shared/components/header/header.component';
import { CartService } from '@shared/services/cart.service';
import { ProductService } from '@shared/services/product.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [ ProductComponent, HeaderComponent ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  //img = "https://picsum.photos/640/640?r=" + Math.random();

  //Lista de productos 
  products = signal<Product[]>([]);
  private cartService = inject(CartService);
  private productService  = inject(ProductService);
  
  ngOnInit(){
    this.productService.getProducts()
    .subscribe({
      next: (products) => {
        this.products.set(products);
      },
      error: () => {

      }
    })
  }
  
  addtToCart(product: Product) {
    console.log("add product");
    this.cartService.addToCart(product);
  }
}
