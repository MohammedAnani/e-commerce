import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from '../../environment/base';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  _HttpClient = inject(HttpClient);
  cartNumber:WritableSignal<number>=signal(0)


  getProductfromCart(): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}api/v1/cart`,

     )
  }



  addProductToCart(id: string): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}api/v1/cart`,
      {
        "productId": id
      },
     )
  }

  removeSpesificItem(id: string): Observable<any> {
    return this._HttpClient.delete(`${environment.baseUrl}api/v1/cart/${id}`,
     )
  }


  updateNumberOfCart(id: string, count:number): Observable<any> {
    return this._HttpClient.put(`${environment.baseUrl}api/v1/cart/${id}`,
      {
        "count": count
      },
     )
  }


  clearCart(): Observable<any> {
    return this._HttpClient.delete(`${environment.baseUrl}api/v1/cart`,

     )
  }
}
