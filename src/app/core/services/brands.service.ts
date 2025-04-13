import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/base';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

_HttpClient=inject(HttpClient)

getAllBrands():Observable<any>{
  return this._HttpClient.get(`${environment.baseUrl}api/v1/brands`)

}
}
