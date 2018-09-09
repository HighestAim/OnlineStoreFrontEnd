import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { UsersService } from './services/users.service';
import { StorageServiceModule } from 'angular-webstorage-service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ClickStopPropagation } from './directives/disableClick';
import { PopupMessagesComponent } from './components/popup-messages/popup-messages.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { StorePageComponent } from './components/store-page/store-page.component';
import { ProductsService } from './services/products.service';
import { ShoppingCardService } from './services/shopping-card.service';
import { CategoriesService } from './services/categories.service';
import { ShoppingCardPageComponent } from './components/shopping-card-page/shopping-card-page.component';
import { PaymentPageComponent } from './components/payment-page/payment-page.component';
import { OrderService } from './services/order.service';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    PopupMessagesComponent,
    ClickStopPropagation,
    StorePageComponent,
    ShoppingCardPageComponent,
    PaymentPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    StorageServiceModule
  ],
  providers: [ UsersService, ProductsService, OrderService, ShoppingCardService, CategoriesService ] ,
  bootstrap: [AppComponent]
})
export class AppModule { }
