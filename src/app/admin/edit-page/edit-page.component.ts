import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Product } from './../../shared/interfaces';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/product.service';
import { pipe } from 'rxjs';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {
  product: Product;
  form: FormGroup;
  submitted = false;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap(params => {
        return this.productService.getById(params.id);
      })
    ).subscribe((product: Product) => {
      this.product = product;
      this.form = new FormGroup({
        type: new FormControl(this.product.type, Validators.required),
        title: new FormControl(this.product.title, Validators.required),
        photo: new FormControl(this.product.photo, Validators.required),
        info: new FormControl(this.product.info, Validators.required),
        price: new FormControl(this.product.price, Validators.required),
      });
    });
  }

  submit(): void {
    if (this.form.invalid) { return; }

    this.submitted = true;

    this.productService
      .update({
        ...this.product,
        type: this.form.value.type,
        title: this.form.value.title,
        photo: this.form.value.photo,
        info: this.form.value.info,
        price: this.form.value.price,
        date: new Date()
      })
      .subscribe(res => {
        this.submitted = false;
        this.router.navigate(['/admin', 'dashboard']);
      });
  }

}
