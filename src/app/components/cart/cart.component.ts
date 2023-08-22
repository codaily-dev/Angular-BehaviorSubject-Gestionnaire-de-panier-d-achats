import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartProduct } from '../../types/types';
import { Observable, Subject, map, takeUntil } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  cartProducts$: Observable<CartProduct[]> = this.cartService.cartProducts$;
  total: number | undefined = undefined;
  private destroyed$ = new Subject<void>();

  constructor(private cartService: CartService) {
    this.calculateTotal();
  }

  private calculateTotal(): void {
    this.cartProducts$
      .pipe(
        map((cartProducts) => {
          return cartProducts.reduce((acc, product) => {
            return acc + product.price * product.quantity;
          }, 0);
        }),
        takeUntil(this.destroyed$)
      )
      .subscribe((total) => {
        this.total = total;
      });
  }

  removeProductFromCart = (id: string): void => {
    this.cartService.removeFromCart(id);
  };

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
