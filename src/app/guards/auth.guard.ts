import { inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { AuthenService } from '../service/Authen/authen.service';
import { isPlatformBrowser } from '@angular/common';

export const authGuard: CanActivateFn = (route, state) => {
  const routes = inject(Router);
  const authService = inject(AuthenService);
  let status=true;

  const isLogged = authService.checkLoginStatus();
  const role = authService.checkRole();
  const requiredRoles: string[] = route.data['roles'];
  if(isLogged) {
    console.log("private page isLogged : " + isLogged);
    if(!requiredRoles.includes(role)) {
      status=false;
      routes.navigate(["/unauthorized"]);
    }
    console.log(state.url);
    return status;
  } else {
    status=false;
  }
  return status;
};

