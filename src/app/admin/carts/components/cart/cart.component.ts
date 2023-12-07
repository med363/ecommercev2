import { Component, OnInit } from '@angular/core';
import { CartsService } from '../../services/carts.service';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  constructor(private service:CartsService) { }
  carts:any[] = [];
  total:number = 0;
  // success:boolean = false
  ngOnInit(): void {
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



}