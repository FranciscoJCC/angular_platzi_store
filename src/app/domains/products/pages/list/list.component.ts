import { Component, Input, inject, signal, SimpleChanges } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';

import { ProductComponent } from '@products/components/product/product.component';
import { Product } from '@shared/models/product.model';
import { HeaderComponent } from '@shared/components/header/header.component';
import { CartMovilComponent } from '@shared/components/cart-movil/cart-movil.component';
import { CartService } from '@shared/services/cart.service';
import { ProductService } from '@shared/services/product.service';
import { CategoryService } from '@shared/services/category.service';
import { Category } from '@shared/models/category.model';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [ ProductComponent, HeaderComponent, RouterLinkWithHref, CartMovilComponent ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export default class ListComponent {
  //img = "https://picsum.photos/640/640?r=" + Math.random();

  //Lista de productos 
  products = signal<Product[]>([]);
  //Lista de categorias
  categories = signal<Category[]>([]);
  //productLimit para paginación
  productLimit = signal(12);

  private cartService = inject(CartService);
  private productService  = inject(ProductService);
  private CategoryService = inject(CategoryService);

  //Filtros por queryparams
  @Input() category_id?: string;
  
  ngOnInit(){
    //Obtenemos los productos
    //this.getProducts();
    //Obtenemos las categorias
    this.getCategories();
  }

  //Leemos cambios durante el ciclo de vida del componente
  ngOnChanges(changes : SimpleChanges){
      this.getProducts()
  }
  
  addtToCart(product: Product) {
    console.log("add product");
    this.cartService.addToCart(product);
  }

  private getProducts(){
    this.productService.getProducts(this.category_id, this.productLimit())
    .subscribe({
      next: (products) => {
        this.products.set(products);
      },
      error: () => {

      }
    })
  }

  private getCategories(){
    this.CategoryService.getAllCategories()
    .subscribe({
      next: (categories) => {
        this.categories.set(categories);
      },
      error: () => {

      }
    })
  }
}
