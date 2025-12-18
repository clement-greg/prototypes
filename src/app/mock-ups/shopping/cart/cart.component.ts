import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { LottiePlayerComponent } from '../../../dependencies/lottie-player/lottie-player.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ShoppingCart, ShoppingCartItem } from '../shopping-cart.model';

@Component({
    selector: 'app-cart',
    imports: [CommonModule, LottiePlayerComponent, MatButtonModule, MatIconModule, MatSnackBarModule, MatTabsModule, MatProgressSpinnerModule],
    templateUrl: './cart.component.html',
    styleUrl: './cart.component.scss'
})
export class CartComponent {
  cart = ShoppingCart.getCart();
  @Output() orderComplete: EventEmitter<any> = new EventEmitter();

  selectedIndex = 0;
  saving = false;


  constructor(private snackBar: MatSnackBar) { }
  get cartTotal() {
    return this.cart.cartItems.map(i => i.item.price * i.quantity).reduce((a, b) => a + b, 0);
  }

  placeOrder() {
    this.saving = true;
    setTimeout(() => {
      this.selectedIndex = 2;
      this.cart.cartItems = [];
      setTimeout(() => {
        this.orderComplete.emit();
      }, 5000);
    }, 1500);

  }

  removeItem(item: ShoppingCartItem) {
    const index = this.cart.cartItems.indexOf(item);
    if (index > -1) {
      this.cart.cartItems.splice(index, 1);
    }

    const ref = this.snackBar.open('Item removed', 'Undo', {
      duration: 2000,
    });

    ref.onAction().subscribe(() => {
      ref.dismiss();
      this.cart.cartItems.splice(index, 0, item);
    });
  }
}
