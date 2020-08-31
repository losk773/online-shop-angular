import { ProductService } from './../shared/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  products$;

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.products$ = this.productService.getAll();
  }

}
