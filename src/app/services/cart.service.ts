import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product, CartProduct } from '../types/types';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartProductsSubject: BehaviorSubject<CartProduct[]> =
    new BehaviorSubject<CartProduct[]>([]);
  public cartProducts$ = this.cartProductsSubject.asObservable();

  constructor() {}

  addToCart(product: Product) {
    const currentProducts = [...this.cartProductsSubject.getValue()];
    const existingProductIndex = currentProducts.findIndex(
      (p) => p.id === product.id
    );

    if (existingProductIndex >= 0) {
      // If the product already exists in the cart, update the quantity
      currentProducts[existingProductIndex].quantity++;
      this.cartProductsSubject.next(currentProducts);
    } else {
      // If the product doesn't exist in the cart, add it with quantity = 1
      this.cartProductsSubject.next([
        ...currentProducts,
        { ...product, quantity: 1 },
      ]);
    }
  }

  removeFromCart(id: string) {
    const currentProducts = this.cartProductsSubject.getValue();
    this.cartProductsSubject.next(currentProducts.filter((p) => p.id !== id));
  }
}
