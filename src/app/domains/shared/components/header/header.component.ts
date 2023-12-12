import { Component, Input, SimpleChanges, signal } from '@angular/core';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  hideSideMenu = signal(true);

  @Input({ required : true}) cart: Product[] = [];
  total = signal(0);

  ngOnChanges(changes: SimpleChanges){
    const cart = changes['cart'];

    if(cart){
      this.total.set(this.getTotalPrice());
    }
  }

  toogleSideMenu(){
    this.hideSideMenu.update(prevState => !prevState)
  }

  getTotalPrice(){
    return this.cart.reduce((total, product) => total + product.price, 0)
  }
}