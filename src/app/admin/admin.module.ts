import { SearchPipe } from './../shared/search.pipe';
import { AuthGuard } from './../shared/auth.guard';
import { LoginPageComponent } from './login-page/login-page.component';
import { AdminLayoutComponent } from './shared/admin-layout/admin-layout.component';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AddPageComponent } from './add-page/add-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { OrdersPageComponent } from './orders-page/orders-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: '/admin/login', pathMatch: 'full' },
      { path: 'login', component: LoginPageComponent },
      { path: 'dashboard', component: DashboardPageComponent, canActivate: [AuthGuard] },
      { path: 'add', component: AddPageComponent, canActivate: [AuthGuard] },
      { path: 'orders', component: OrdersPageComponent, canActivate: [AuthGuard] },
      { path: 'product/:id/edit', component: EditPageComponent, canActivate: [AuthGuard] },
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    QuillModule.forRoot()
  ],
  exports: [RouterModule],
  declarations: [
    AdminLayoutComponent,
    AddPageComponent,
    DashboardPageComponent,
    EditPageComponent,
    OrdersPageComponent,
    LoginPageComponent,
    SearchPipe,
  ]
})

export class AdminModule {

}
