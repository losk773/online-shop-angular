import { FbProductResponse, Product } from './interfaces';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/internal/operators/map';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  type = 'Phone';

  constructor(
    private http: HttpClient
  ) { }

  create(product: Product): Observable<Product> {
    return this.http
      .post(`${environment.fbDBUrl}/products.json`, product)
      .pipe(
        map((res: FbProductResponse) => ({
          ...product,
          id: res.name,
          date: new Date(product.date)
        }))
      );
  }

  getAll(): Observable<Product[]> {
    return this.http
      .get(`${environment.fbDBUrl}/products.json`)
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

  getById(id: string): Observable<Product> {
    return this.http
      .get(`${environment.fbDBUrl}/products/${id}.json`)
      .pipe(
        map((res: Product) => ({
          ...res,
          id,
          date: new Date(res.date)
        }))
      );
  }

  remove(id: string): Observable<Product> {
    return this.http.delete(`${environment.fbDBUrl}/products/${id}.json`);
  }

  update(product: Product): Observable<Product> {
    return this.http.patch(`${environment.fbDBUrl}/products/${product.id}.json`, product);
  }

  setType(type: string): void {
    this.type = type;
  }
}
