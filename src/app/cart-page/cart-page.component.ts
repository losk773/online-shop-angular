import { OrderService } from './../shared/order.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductService } from 'src/app/shared/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../shared/interfaces';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {
  cartProducts = [];
  totalPrice = 0;
  form: FormGroup;
  submitted = false;

  constructor(
    private orderService: OrderService,
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      payment: new FormControl('Cash'),
    });

    this.cartProducts = this.orderService.cartProducts;

    this.cartProducts.map(item => {
      this.totalPrice += parseInt(item.price, 10);
    });
  }

  submit(): void {
    if (this.form.invalid) { return; }

    this.submitted = true;

    const order = {
      name: this.form.value.name,
      phone: this.form.value.phone,
      address: this.form.value.address,
      payment: this.form.value.payment,
      price: this.totalPrice,
      orders: this.cartProducts,
      date: new Date(),
    };

    this.orderService
      .create(order)
      .subscribe(res => {
        this.form.reset();
        this.submitted = false;
        this.clearCart();
      });
  }

  clearCart(): void {
    this.cartProducts = [];
    this.totalPrice = 0;
    this.orderService.clear();
  }

  delete(product: Product): void {
    this.totalPrice -= parseInt(product.price, 10);
    this.cartProducts.splice(this.cartProducts.indexOf(product), 1);
  }

}
