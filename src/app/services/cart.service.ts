import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: any[] = [];
  cartItemsChanged = new Subject<void>();

  constructor() {}

  getCart() {
    return this.cartItems.slice();
  }

  getTotalItems() {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  addItem(item: any) {
    const existingItem = this.cartItems.find(i => i.id === item.id);

    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      this.cartItems.push({ ...item });
    }

    this.cartItemsChanged.next();
  }

  updateCartItem(updatedItem: any) {
    const index = this.cartItems.findIndex(item => item.id === updatedItem.id);

    if (index !== -1) {
      this.cartItems[index].quantity = updatedItem.quantity;
      this.cartItemsChanged.next();
    }
  }

  removeCartItem(itemToRemove: any) {
    const index = this.cartItems.findIndex(item => item.id === itemToRemove.id);

    if (index !== -1) {
      this.cartItems.splice(index, 1);
      this.cartItemsChanged.next();
    }
  }

  clearCart() {
    this.cartItems = [];
    this.cartItemsChanged.next();
  }
}
