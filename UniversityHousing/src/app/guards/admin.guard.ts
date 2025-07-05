import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '../Uthentication/services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  if (inject(AuthService).isAdmin()) {
    return true;
  }else{
    inject(Router).navigate(['/login'])
    return false
  }
};
