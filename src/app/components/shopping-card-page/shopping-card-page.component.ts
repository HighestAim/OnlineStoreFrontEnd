import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import IProductModel from '../../models/IProductModel';
import { ShoppingCardService } from '../../services/shopping-card.service';
import { PopupMessagesService } from '../../services/popup-messages.service';
import { popupTitle } from '../../constants/popup-title.constant';
import { CategoriesService } from '../../services/categories.service';
import ICategoryModel from '../../models/ICategoryModel';
import { EResponseStatus } from '../../enums/EResponseStatus';

@Component({
  selector: 'app-shopping-card-page',
  templateUrl: './shopping-card-page.component.html',
  styleUrls: ['./shopping-card-page.component.css']
})
export class ShoppingCardPageComponent implements OnInit, OnDestroy {

  private subscriptions: Array<Subscription> = [];
  public cardProducts: Array<IProductModel> = new Array<IProductModel>();
  private categories: Array<ICategoryModel> = new Array<ICategoryModel>();

  constructor(private popupMessageService: PopupMessagesService,
              private categoryService: CategoriesService,
              private shoppingCardService: ShoppingCardService) { }

  ngOnInit() {
    this.cardProducts = this.shoppingCardService && this.shoppingCardService.cardProducts &&
      this.shoppingCardService.cardProducts.filter(x => x.quantity > 0) &&
      this.shoppingCardService.cardProducts.filter(x => x.quantity > 0).slice();
    this.subscriptions.push(
      this.categoryService.getCategories().subscribe((response => {
        console.log(response);
        if (!response || !response.status || response.status !== EResponseStatus.Ok || response.errorMessage) {
          this.popupMessageService.show(popupTitle.ERROR, 'Can\'t get categories.');
        } else {
          this.categories = response.result;
        }
      }))
    );
  }

  isProductInCard(product: IProductModel) {
    return this.cardProducts.some(x => x.id === product.id && x.quantity > 0);
  }

  openProductDetailsModal(product: IProductModel) {
    const message = `Price: ${product.price}$`;
    const subMessage = `Category: ${this.categories.find( x => x.id === product.categoryId).name}`;
    this.popupMessageService.showWithImage(product.name, product.url, subMessage, message);
  }

  totalPrice(): number {
    let total = 0;
    if (this.shoppingCardService && this.shoppingCardService.cardProducts) {
      this.shoppingCardService.cardProducts.forEach(x => total += (x.price * x.quantity));
    }
    return total;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(item => item.unsubscribe());
  }

  removeProductFromCard(product: IProductModel) {
    if (this.cardProducts.some(x => x.id === product.id)) {
      this.cardProducts.find(x => x.id === product.id).quantity--;

      if (this.cardProducts.find(x => x.id === product.id).quantity === 0) {
        this.cardProducts.splice(this.cardProducts.indexOf(product), 1);
      }
    }
    this.shoppingCardService.addCardProducts(this.cardProducts);
  }
}
