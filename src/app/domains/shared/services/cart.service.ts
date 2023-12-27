import { Injectable, computed, signal } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  //Definicion
  cart = signal<Product[]>([]);
  //Mostrar / Ocultar
  hideSideMenu = signal(true);

  total = computed(() => {
    const cart = this.cart();
    return cart.reduce((total, product) => total + product.price,0)
  })

  constructor() { }

  addToCart(product: Product) {
    this.cart.update(state => [...state, product]);
  }

  //Oculta o muestra el carrito lateral
  toogleSideMenu(){
    this.hideSideMenu.update(prevState => !prevState);
  }
}
