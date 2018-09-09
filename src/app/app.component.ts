import { Component, OnInit } from '@angular/core';
import { UsersService } from './services/users.service';
import { LocalStorageService } from './services/local-storage.service';
import { ShoppingCardService } from './services/shopping-card.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(public usersService: UsersService,
              private localStorageService: LocalStorageService,
              private shoppingCardService: ShoppingCardService) {
  }

  ngOnInit() {
    const userStorageData = this.localStorageService.getFromLocalStorage(this.usersService.storageKey);
    const shoppingStorageData = this.localStorageService.getFromLocalStorage(this.shoppingCardService.storageKey);
    console.log(shoppingStorageData);
    if (userStorageData) {
      this.usersService.signedUser = userStorageData.authData;
    }
    if (shoppingStorageData && shoppingStorageData.shoppingData) {
      this.shoppingCardService.cardProducts = shoppingStorageData.shoppingData;
    }
  }

  shoppingCardOProductsCount(): number {
    let totalQuantity = 0;
    if (this.shoppingCardService && this.shoppingCardService.cardProducts) {
      this.shoppingCardService.cardProducts.forEach(x => totalQuantity += x.quantity);
    }
    return totalQuantity;
  }
}
