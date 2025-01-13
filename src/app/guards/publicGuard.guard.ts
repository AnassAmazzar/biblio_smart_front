import { CanActivateFn, Router } from '@angular/router';
import { AuthenService } from '../service/Authen/authen.service';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const publicGuard: CanActivateFn = (route, state) => {
  const routes = inject(Router);
  const authService = inject(AuthenService);
  let status=true;

  const isLogged = authService.checkLoginStatus();
  const role = authService.checkRole();

  console.log("Url => " + state.url);
  if(!isLogged) {
    status=true;
  }else {
    routes.navigateByUrl("/home");
    status=false;
  }
  return status;
};
