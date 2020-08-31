import { OrderService } from './../../shared/order.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Order } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss']
})
export class OrdersPageComponent implements OnInit {
  orders = [];
  productSub: Subscription;
  removeSub: Subscription;

  constructor(
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.productSub = this.orderService
      .getAll()
      .subscribe((orders: Order[]) => {
        this.orders = orders;
      });
  }

  ngOnDestroy(): void {
    if (this.productSub) {
      this.productSub.unsubscribe();
    }

    if (this.removeSub) {
      this.removeSub.unsubscribe();
    }
  }

  remove(id: string): void {
    this.orderService.remove(id).subscribe(() => {
      this.orders = this.orders.filter(order => order.id !== id);
    });
  }
}
