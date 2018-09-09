import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs/index';
import IRegistrationModel from '../models/IRegistrationModel';
import IResponseModel from '../models/IResponseModel';
import { environment } from '../../environments/environment.prod';
import { catchError } from 'rxjs/internal/operators';
import IProductModel from '../models/IProductModel';
import { UsersService } from './users.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ProductsService {
  private urlPrefix = 'Products/';

  constructor(private http: HttpClient, private userService: UsersService) {
    this.urlPrefix = environment.domain + this.urlPrefix;
  }

  public getProducts(): Observable<IResponseModel<IProductModel[]>> {
    const url = `${this.urlPrefix}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.userService.signedUser.token}` });
    return this.http.get<IResponseModel<IProductModel[]>>(url, {headers})
      .pipe(
        catchError(this.handleError())
      );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);
      return of(result as T);
    };
  }
}
