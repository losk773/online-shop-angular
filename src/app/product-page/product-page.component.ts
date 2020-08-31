import { Product } from './../shared/interfaces';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../shared/product.service';
import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { OrderService } from '../shared/order.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {

  product$: Observable<Product>;

  constructor(
    private productServe: ProductService,
    private orderService: OrderService,
    private router: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.product$ = this.router.params
      .pipe(
        switchMap( params => {
          return this.productServe.getById(params.id);
        })
      );
  }

  addProduct(product: Product): void {
    this.orderService.addProduct(product);
  }

}
