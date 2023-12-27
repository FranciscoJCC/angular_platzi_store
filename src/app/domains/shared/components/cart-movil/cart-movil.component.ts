import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-movil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-movil.component.html',
  styleUrl: './cart-movil.component.css'
})
export class CartMovilComponent {
  //hideSideMenu = signal(true);
  private CartService = inject(CartService);

  cart = this.CartService.cart;
  total = this.CartService.total;
  hideSideMenu = this.CartService.hideSideMenu;

  toogleSideMenu(){
    this.CartService.toogleSideMenu();
  }
}
