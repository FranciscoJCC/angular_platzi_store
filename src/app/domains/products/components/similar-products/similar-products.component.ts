import { Component, Input, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from '@products/components/product/product.component';
import { GridProductsComponent } from '../grid-products/grid-products.component';
import { ProductService } from '@shared/services/product.service';
import { Product } from '@shared/models/product.model';

@Component({
  selector: 'app-similar-products',
  standalone: true,
  imports: [CommonModule, ProductComponent, GridProductsComponent],
  templateUrl: './similar-products.component.html',
  styleUrl: './similar-products.component.css'
})
export class SimilarProductsComponent {
  @Input() categoryId? : number;

  //Productos similares
  similarProducts = signal<Product[]>([]);

  private ProductService = inject(ProductService);

  ngOnChanges(){
    this.getSimilarProducts();
  }
  
  getSimilarProducts(){
    if(this.categoryId){
      this.ProductService.getSimilarProducts(this.categoryId)
      .subscribe({
        next: (products) => {
          this.similarProducts.set(products)
          console.log("productos",products);
        },
        error: (error) => {
          console.log(error);
        }
      })
    }   
  }
}
