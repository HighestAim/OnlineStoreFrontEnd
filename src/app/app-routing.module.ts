import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './components/registration/registration.component';
import { StorePageComponent } from './components/store-page/store-page.component';
import { ShoppingCardPageComponent } from './components/shopping-card-page/shopping-card-page.component';
import { PaymentPageComponent } from './components/payment-page/payment-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/store', pathMatch: 'full' },
  { path: 'store', component: StorePageComponent },
  { path: 'shopping', component: ShoppingCardPageComponent },
  { path: 'payment', component: PaymentPageComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
