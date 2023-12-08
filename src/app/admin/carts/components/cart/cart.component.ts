import { Component, OnInit } from '@angular/core';
import { CartsService } from '../../services/carts.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductsService } from 'src/app/admin/products/services/products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  constructor(private service:CartsService, private build:FormBuilder, private product:ProductsService) { }
  carts:any[] = [];
  products:any[]=[]
  total:number = 0;
  // formgrup
  form!:FormGroup
  // success:boolean = false
  details:any
  ngOnInit(): void {
      // formgrup
    this.form = this.build.group({
start:[''],
end:['']
    })
    this.getCarts()
  }

  getCarts(){
    this.service.getAllCarts().subscribe((res:any)=>{
      this.carts=res
    })
  }

  deleteProduct(index:number) {
    this.carts.splice(index , 1)
    this.getCartTotal()
    localStorage.setItem("cart" , JSON.stringify(this.carts))
  }

  getCartTotal() {
    this.total = 0
    for(let x in this.carts) {
      this.total += this.carts[x].item.price * this.carts[x].quantity;
    }
  }

  // getCartProducts() {
  //   if("cart" in localStorage) {
  //     this.cartProducts = JSON.parse(localStorage.getItem("cart")!)
  //   }
  //   this.getCartTotal()
  // }

  applyFilter(){
    // console.log(this.form.value);
    let date = this.form.value
    this.service.getAllCarts(date).subscribe((res:any)=>{
      this.carts=res
    })
    
  }

  deleteCart(id:number){
    this.service.deleteCart(id).subscribe(res => {
      this.getCarts()
      alert("cart deleted")
    })
  }

  view(index:number){
    this.details = this.carts[index]
    for(let x in this.details.products){
      // send product with specifie id
this.product.getProductById(this.details.products[x].productId).subscribe(res=>{
  this.products.push({item:res, quantity:this.details.products[x].quantity})
})
    }
    console.log(this.details);
    
  }


}