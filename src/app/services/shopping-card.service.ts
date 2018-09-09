import { Injectable } from '@angular/core';
import IProductModel from '../models/IProductModel';
import { LocalStorageService } from './local-storage.service';

@Injectable()
export class ShoppingCardService {
  public storageKey = 'shoppingData';
  public cardProducts: Array<IProductModel> = new Array<IProductModel>();

  constructor(private localStoreService: LocalStorageService) {}

  addCardProducts(cardProducts: Array<IProductModel>) {
    this.cardProducts = cardProducts.slice();
    this.localStoreService.saveInLocalStorage(this.storageKey, cardProducts);
  }
}
