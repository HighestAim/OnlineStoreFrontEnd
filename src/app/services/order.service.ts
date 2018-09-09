import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs/index';
import IResponseModel from '../models/IResponseModel';
import { environment } from '../../environments/environment.prod';
import { catchError } from 'rxjs/internal/operators';
import IProductModel from '../models/IProductModel';
import { UsersService } from './users.service';
import IOrderModel from '../models/IOrderModel';

@Injectable()
export class OrderService {
  private urlPrefix = 'Orders/';

  constructor(private http: HttpClient, private userService: UsersService) {
    this.urlPrefix = environment.domain + this.urlPrefix;
  }

  public orderProducts(data: IOrderModel): Observable<IResponseModel<null>> {
    const url = `${this.urlPrefix}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.userService.signedUser.token}` });
    return this.http.post<IResponseModel<null>>(url, data, { headers })
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
