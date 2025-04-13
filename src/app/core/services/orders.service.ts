import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/base';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

_HttpClient=inject(HttpClient);



checkOut(id:string|null,shippingAddress:object):Observable<any>
{
  return this._HttpClient.post(`${environment.baseUrl}api/v1/orders/checkout-session/${id}?url=http://localhost:4200`,
    {
      "shippingAddress":shippingAddress
    },

    
  )
}
}
