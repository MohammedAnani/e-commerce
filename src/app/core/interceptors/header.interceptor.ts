import { HttpInterceptorFn } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {

 let  _ToastrService=inject(ToastrService)
  if (localStorage.getItem("tokenUser") !== null) {
    req = req.clone({
      setHeaders: { Token: localStorage.getItem("tokenUser")! }
    })
  }



  return next(req)
};
