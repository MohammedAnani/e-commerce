import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/base';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  _HttpClient=inject(HttpClient)

  getAllProducts():Observable<any>
  {
    return this._HttpClient.get(`${environment.baseUrl}api/v1/products`)
  }
  getSpesificProducts(id:any):Observable<any>
  {
    return this._HttpClient.get(`${environment.baseUrl}api/v1/products/${id}`)
  }
}
