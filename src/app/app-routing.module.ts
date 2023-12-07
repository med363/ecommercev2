import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { CartComponent } from '../app/user/carts/components/cart/cart.component';
import { CartComponent } from '../app/admin/carts/components/cart/cart.component';
// import { AllProductsComponent } from '../app/user/products/components/all-products/all-products.component';
import { AllProductsComponent } from '../app/admin/products/components/all-products/all-products.component';
// import { ProductsDetailsComponent } from '../app/user/products/components/products-details/products-details.component';
import { ProductsDetailsComponent } from '../app/admin/products/components/products-details/products-details.component';

const routes: Routes = [
  {path:"products" , component:AllProductsComponent},
  {path:"details/:id" , component:ProductsDetailsComponent},
  {path:'cart' , component:CartComponent},
  {path:"**" , redirectTo:"products" , pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }