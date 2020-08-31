import { OrderService } from './../shared/order.service';
import { Product } from './../shared/interfaces';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() product;

  constructor(
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
  }

  addProduct(product: Product): void {
    this.orderService.addProduct(product);
  }

}
