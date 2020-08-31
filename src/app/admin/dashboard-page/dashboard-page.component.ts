import { ProductService } from './../../shared/product.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {
  products = [];
  productSub: Subscription;
  removeSub: Subscription;
  productName: string;

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.productSub = this.productService
      .getAll()
      .subscribe((products: Product[]) => {
        this.products = products;
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
    this.productService.remove(id).subscribe(() => {
      this.products = this.products.filter(product => product.id !== id);
    });
  }

}
