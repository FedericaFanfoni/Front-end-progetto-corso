import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService } from '../services/account.service';

export const tokenInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {

  const accountService = inject(AccountService)
  if (!accountService.utenteLoggato()) {
    return next(req);
  }
  else {
    const jwt = localStorage.getItem("jwt")
    const request = req.clone({
      setHeaders: { Authorization: `Bearer ${jwt}` }
    })
    return next(request)
  }

};


