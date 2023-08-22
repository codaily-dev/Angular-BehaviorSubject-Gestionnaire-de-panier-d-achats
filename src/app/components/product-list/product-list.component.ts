import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../types/types';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent {
  products$: Observable<Product[]> = this.productService.getProducts();

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  addProductToCart = (product: Product): void => {
    this.cartService.addToCart(product);
  };
}
