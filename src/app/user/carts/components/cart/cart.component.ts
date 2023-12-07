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
  cartProducts:any[] = [];
  total:number = 0;
  success:boolean = false
  ngOnInit(): void {
    this.getCartProducts()
  }


  getCartProducts() {
    if("cart" in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem("cart")!)
    }
    this.getCartTotal()
  }

  addAmount(index:number) {
    this.cartProducts[index].quantity++
    this.getCartTotal()
    localStorage.setItem("cart" , JSON.stringify(this.cartProducts))
  }
  minsAmount(index:number) {
    this.cartProducts[index].quantity--
    this.getCartTotal()
    localStorage.setItem("cart" , JSON.stringify(this.cartProducts))
  }
  detectChange() {
    this.getCartTotal()
    localStorage.setItem("cart" , JSON.stringify(this.cartProducts))
  }

  deleteProduct(index:number) {
    this.cartProducts.splice(index , 1)
    this.getCartTotal()
    localStorage.setItem("cart" , JSON.stringify(this.cartProducts))
  }

  clearCart() {
    this.cartProducts = []
    this.getCartTotal()
    localStorage.setItem("cart" , JSON.stringify(this.cartProducts))
  }
  getCartTotal() {
    this.total = 0
    for(let x in this.cartProducts) {
      this.total += this.cartProducts[x].item.price * this.cartProducts[x].quantity;
    }
  }

  addCart() {
   let products = this.cartProducts.map(item => {
    return {productId:item.item.id , quantity:item.quantity}
   })

    let Model = {
      userId:5,
      date: new Date(),
      products:products
    }

    this.service.createNewCart(Model).subscribe(res => {
      this.success = true
    })

    console.log(Model)
    console.log('PDF is being generated...');
    // Create a new instance of jsPDF
 const doc = new jsPDF();

// Add a title to the PDF with custom styling
doc.setFontSize(20);
doc.text('Order Details', 105, 15, );

 // Initialize the vertical position for content
 let yPos = 30;
 // Loop through the products in the cart
 this.cartProducts.forEach((item, index) => {
      // Product name and price with custom styling
      doc.setFontSize(14);
      doc.setTextColor(0, 0, 0); // Black color
      doc.text(item.item.title, 20, yPos);
      doc.text(`${item.item.price} DT`, 160, yPos);
  
      // Product quantity and total with custom styling
      doc.setFontSize(12);
      doc.setTextColor(128, 128, 128); // Gray color
      doc.text(`Quantity: ${item.quantity}`, 20, yPos + 10);
      doc.text(`Total: ${item.item.price * item.quantity} DT`, 160, yPos + 10);
  


   // Increase the vertical position for the next product
   yPos += 30;
 });

// Calculate the X-coordinate to center the text
const textWidth = doc.getStringUnitWidth(`Total Price: ${this.total} DT`)  / doc.internal.scaleFactor;
const xCoordinate = (doc.internal.pageSize.getWidth() - textWidth) / 2;

// Add the total price with custom styling and center the text
doc.setFontSize(16);
doc.setTextColor(0, 0, 0); // Black color
doc.text(`Total Price: ${this.total} DT`, xCoordinate, yPos + 20);
 // Save the PDF as a file
 doc.save('order_details.pdf');

  }


}