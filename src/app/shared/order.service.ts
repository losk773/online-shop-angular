import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';
import { Observable } from 'rxjs';
import { FbProductResponse, Order, Product } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  cartProducts: Product[] = [];

  constructor(
    private http: HttpClient
  ) { }

  addProduct(product: Product): void {
    this.cartProducts.push(product);
  }

  create(order: Order): Observable<Order> {
    return this.http
      .post(`${environment.fbDBUrl}/orders.json`, order)
      .pipe(
        map((res: FbProductResponse) => ({
          ...order,
          id: res.name,
          date: new Date(order.date)
        }))
      );
  }

  clear(): void {
    this.cartProducts = [];
  }

  getAll(): Observable<Order[]> {
    return this.http
      .get(`${environment.fbDBUrl}/orders.json`)
      .pipe(
        map((res: Product) => (
          Object.keys(res)
            .map(key => ({
              ...res[key],
              id: key,
              date: new Date(res[key].date)
            }))
        ))
      );
  }

  remove(id: string): Observable<Order> {
    return this.http.delete(`${environment.fbDBUrl}/orders/${id}.json`);
  }
}
