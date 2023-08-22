import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { productsMock } from '../mock/products.mock';
import { Product } from '../types/types';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor() {}

  getProducts(): Observable<Product[]> {
    return of(productsMock);
  }
}
