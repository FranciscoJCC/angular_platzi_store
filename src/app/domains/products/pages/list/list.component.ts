import { Component, signal } from '@angular/core';

import { ProductComponent } from './../../components/product/product.component';
import { Product } from './../../../shared/models/product.model';
import { HeaderComponent } from '../../../shared/components/header/header.component';

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
  cart = signal<Product[]>([]);

  constructor() {
    const initProducts: Product[] = [
      {
        id: Date.now(),
        title: 'Producto 1',
        price: 3000,
        image: 'https://picsum.photos/640/640?r=23',
        creationAt: new Date().toISOString()
      },
      {
        id: Date.now(),
        title: 'Producto 2',
        price: 1500,
        image: 'https://picsum.photos/640/640?r=12',
        creationAt: new Date().toISOString()
      },
      {
        id: Date.now(),
        title: 'Producto 3',
        price: 1500,
        image: 'https://picsum.photos/640/640?r=40',
        creationAt: new Date().toISOString()
      },
      {
        id: Date.now(),
        title: 'Producto 4',
        price: 3000,
        image: 'https://picsum.photos/640/640?r=23',
        creationAt: new Date().toISOString()
      },
      {
        id: Date.now(),
        title: 'Producto 5',
        price: 1500,
        image: 'https://picsum.photos/640/640?r=12',
        creationAt: new Date().toISOString()
      },
      {
        id: Date.now(),
        title: 'Producto 6',
        price: 1500,
        image: 'https://picsum.photos/640/640?r=40',
        creationAt: new Date().toISOString()
      },
      {
        id: Date.now(),
        title: 'Producto 7',
        price: 1500,
        image: 'https://picsum.photos/640/640?r=40',
        creationAt: new Date().toISOString()
      },
      {
        id: Date.now(),
        title: 'Producto 8',
        price: 1500,
        image: 'https://picsum.photos/640/640?r=40',
        creationAt: new Date().toISOString()
      }

    ];

    this.products.set(initProducts);
  }

  addtToCart(product: Product) {
    //console.log('estamos en el padre');
    //console.log(event);
    this.cart.update(prevstate => [...prevstate, product]);
  }
}
