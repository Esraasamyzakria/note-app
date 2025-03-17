import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastrService =inject(ToastrService);
  return next(req).pipe(catchError((err)=>{
    if(err.error.msg !== 'not notes found'){
      toastrService.error(err.error.msg);
    }
return throwError(()=> err )
  }));
};
