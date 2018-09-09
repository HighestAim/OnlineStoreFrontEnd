import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { PopupMessagesService } from '../../services/popup-messages.service';
import { ProductsService } from '../../services/products.service';
import { EResponseStatus } from '../../enums/EResponseStatus';
import { popupTitle } from '../../constants/popup-title.constant';
import IProductModel from '../../models/IProductModel';
import { ShoppingCardService } from '../../services/shopping-card.service';
import ICategoryModel from '../../models/ICategoryModel';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-store-page',
  templateUrl: './store-page.component.html',
  styleUrls: ['./store-page.component.css']
})
export class StorePageComponent implements OnInit, OnDestroy {

  private subscriptions: Array<Subscription> = [];
  private products: Array<IProductModel> = [];
  public cardProducts: Array<IProductModel> = new Array<IProductModel>();
  private categories: Array<ICategoryModel> = new Array<ICategoryModel>();
  private selectedCategory = '0';

  constructor(private popupMessageService: PopupMessagesService,
              private productsService: ProductsService,
              private categoryService: CategoriesService,
              private shoppingCardService: ShoppingCardService) { }

  ngOnInit() {
    this.getProducts();
    this.cardProducts = this.shoppingCardService && this.shoppingCardService.cardProducts && this.shoppingCardService.cardProducts.slice();
  }

  isProductInCard(product: IProductModel) {
    return this.cardProducts.some(x => x.id === product.id && x.quantity > 0);
  }

  selectCategory() {
    console.log('selected category', this.selectedCategory);
    if (this.selectedCategory === '0') {
      this.getProducts();
    } else {
      this.subscriptions.push(
        this.categoryService.getProductByCategoryId(this.selectedCategory).subscribe(response => {
          console.log(response);
          if (!response || !response.status || response.status !== EResponseStatus.Ok || response.errorMessage) {
            this.popupMessageService.show(popupTitle.ERROR, 'Can\'t get products.');
          } else {
            this.products = response.result;
            this.products.forEach(prod => {
              prod.quantity = 1;
            });
            console.log(this.products);
          }
        })
      );
    }
  }

  getProducts(): void {
    this.subscriptions.push(
      this.productsService.getProducts().subscribe(response => {
        console.log(response);
        if (!response || !response.status || response.status !== EResponseStatus.Ok || response.errorMessage) {
          this.popupMessageService.show(popupTitle.ERROR, 'Can\'t get products.');
        } else {
          this.products = response.result;
          this.products.forEach(prod => { prod.quantity = 1; } );
          console.log(this.products);
        }
      })
    );
    this.subscriptions.push(
      this.categoryService.getCategories().subscribe((response => {
        console.log(response);
         if (!response || !response.status || response.status !== EResponseStatus.Ok || response.errorMessage) {
           this.popupMessageService.show(popupTitle.ERROR, 'Can\'t get categories.');
         } else {
           this.categories = response.result;
           this.categories.unshift({ name: 'All', id: 0 });
         }
      }))
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(item => item.unsubscribe());
  }

  addProductToCard(product: IProductModel) {
    if (this.cardProducts.some( x => x.id === product.id)) {
      this.cardProducts.find(x => x.id === product.id).quantity++;
    } else {
      this.cardProducts.push(product);
    }

    this.shoppingCardService.addCardProducts(this.cardProducts);
    console.log(product);
  }

  removeProductFromCard(product: IProductModel) {
    if (this.cardProducts.some(x => x.id === product.id)) {
      this.cardProducts.find(x => x.id === product.id).quantity--;
    }
    this.shoppingCardService.addCardProducts(this.cardProducts);
  }
}
