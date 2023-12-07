import { Component, OnInit,NgZone } from '@angular/core';
import { faBasketShopping } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  basketShopp=faBasketShopping
  cartProduct:any[]= []

  constructor(private zone: NgZone) { }

  ngOnInit(): void {
    this.updateCartData();
    // Listen for storage events
    window.addEventListener('storage', (event) => {
      if (event.key === 'cart') {
        this.zone.run(() => {
          this.updateCartData();
        });
      }
    });
  }

  private updateCartData() {
    // Retrieve data from local storage and parse it
    const storedCartData = localStorage.getItem('cart');
    if (storedCartData) {
      this.cartProduct = JSON.parse(storedCartData);
    }
  }

   // Custom method to clear the cart and update the array
   clearCart() {
    localStorage.removeItem('cart');
    this.cartProduct = [];
  }

}