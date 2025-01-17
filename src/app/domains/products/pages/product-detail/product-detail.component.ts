import { Component, Input, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../shared/services/product.service';
import { Product } from '@shared/models/product.model';
import { CartService } from '../../../shared/services/cart.service';
import { SimilarProductsComponent } from '@products/components/similar-products/similar-products.component';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, SimilarProductsComponent],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export default class ProductDetailComponent {
  
  //Obtenemos el parametro de la ruta
  @Input() id?: string;
  //Guardamos el producto obtenido de la api
  product = signal<Product | null>(null);
  //Control de la imagen de portada
  cover = signal('');
  //Servicio de product
  private ProductService = inject(ProductService);
  //Servicio de cart
  private CartService = inject(CartService);
  
  ngOnChanges(){
    if(this.id)
      this.ProductService.getOneProduct(this.id)
    .subscribe({
      next: (product) => {
        this.product.set(product);
        if(product.images.length > 0)
          this.cover.set(product.images[0])
      },
      error: () => {

      }
    })
  }

  changeCover(newImage : string){
    this.cover.set(newImage);
  }

  addToCart(){
    const product = this.product();
    
    //Validamos que no esté vacio el producto
    if(product)
      this.CartService.addToCart(product);
  }

}
