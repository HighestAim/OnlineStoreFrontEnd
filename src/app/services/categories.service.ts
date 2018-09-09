import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs/index';
import IRegistrationModel from '../models/IRegistrationModel';
import IResponseModel from '../models/IResponseModel';
import { environment } from '../../environments/environment.prod';
import { catchError } from 'rxjs/internal/operators';
import { UsersService } from './users.service';
import ICategoryModel from '../models/ICategoryModel';
import IProductModel from '../models/IProductModel';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class CategoriesService {
  private urlPrefix = 'Categories/';

  constructor(private http: HttpClient, private userService: UsersService) {
    this.urlPrefix = environment.domain + this.urlPrefix;
  }

  public getCategories(): Observable<IResponseModel<ICategoryModel[]>> {
    const url = `${this.urlPrefix}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.userService.signedUser.token}` });
    return this.http.get<IResponseModel<ICategoryModel[]>>(url, {headers})
      .pipe(
        catchError(this.handleError())
      );
  }

  public getProductByCategoryId(id: string): Observable<IResponseModel<IProductModel[]>> {
    const url = `${this.urlPrefix}${id}/Products`;
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
