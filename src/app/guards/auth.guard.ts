import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AccountService } from '../services/account.service';

export const authGuard: CanActivateFn = (route, state) => {
  
  const accountService = inject(AccountService)
  const router =  inject(Router)

  // Se non sei loggato non entri
  if(!accountService.utenteLoggato()){
    router.navigateByUrl("/login")
    return false
  }
  
    return true;
};
