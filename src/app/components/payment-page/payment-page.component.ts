import { Component, Injectable, OnDestroy, OnInit } from '@angular/core';
import IRegistrationModel from '../../models/IRegistrationModel';
import {UsersService} from '../../services/users.service';
import { EResponseStatus } from '../../enums/EResponseStatus';
import { PopupMessagesService } from '../../services/popup-messages.service';
import { popupTitle } from '../../constants/popup-title.constant';
import { Subscription } from 'rxjs/index';
import IOrderModel from '../../models/IOrderModel';
import { ShoppingCardService } from '../../services/shopping-card.service';
import IOrderProductModel from '../../models/IOrderProductModel';
import { OrderService } from '../../services/order.service';
import IProductModel from '../../models/IProductModel';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.css']
})

export class PaymentPageComponent implements OnInit, OnDestroy {

  userData: IRegistrationModel = {
    firstName: '',
    lastName: '',
    userName: '',
    password: '',
    address: '',
    city: '',
    country: '',
    email: '',
    phone: '',
    postalCode: '',
    state: ''
  };
  private subscriptions: Array<Subscription> = [];

  constructor(private popupMessageService: PopupMessagesService, private userService: UsersService,
              private shoppingCardService: ShoppingCardService, private orderService: OrderService) { }

  ngOnInit() {
    this.subscriptions.push(
      this.userService.getUserById(this.userService.signedUser.id).subscribe(response => {
        if (!response || !response.status || response.status !== EResponseStatus.Ok || response.errorMessage) {
          this.popupMessageService.show(popupTitle.ERROR, 'Getting user data failed.');
        } else {
          this.userData = response.result;
        }
      })
    );
  }

  update(): void {
    if (this.shoppingCardService.cardProducts &&
      this.shoppingCardService.cardProducts.some(x => x.quantity > 0)) {
      if (this.userData.firstName
        && this.userData.lastName
        && this.userData.address
        && this.userData.email) {
        this.subscriptions.push(
          this.userService.updateUser(this.userData).subscribe(result => {
            if (!result || !result.status || result.status !== EResponseStatus.Ok || result.errorMessage) {
              this.popupMessageService.show(popupTitle.ERROR, 'Payment failed.');
            } else {
                const order: IOrderModel = {
                  orderProducts: this.shoppingCardService.cardProducts.filter(x => x.quantity > 0).map(x => {
                    const orderProduct: IOrderProductModel = {
                      productId: x.id,
                      quantity: x.quantity
                    };
                    return orderProduct;
                  })
                };
                this.orderService.orderProducts(order).subscribe(response => {
                  if (!response || !response.status ||
                    response.status !== EResponseStatus.Ok || response.errorMessage) {
                    this.popupMessageService.show(popupTitle.ERROR, 'Payment failed.');
                  } else {
                    this.popupMessageService.show(popupTitle.SUCCESS, 'Payment success!');
                    this.shoppingCardService.addCardProducts(new Array<IProductModel>());
                  }
                });
            }
          })
        );
      } else {
        this.popupMessageService.show(popupTitle.ERROR, 'Fill required empty fields.');
      }
    } else {
      this.popupMessageService.show(popupTitle.ERROR, 'No selected product.');
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(item => item.unsubscribe());
  }
}
