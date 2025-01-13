import { Component, inject, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Router } from '@angular/router';
import { AuthenService } from '../../service/Authen/authen.service';
import { Client } from '../../domain/Client';
import { User } from '../../domain/User';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [DividerModule, ButtonModule, InputTextModule, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [AuthenService]
})
export class LoginComponent {
  user!: User;
  tokenKey: any | undefined;
  selectedRole: any | undefined;
  submitted: boolean = false;
  platformId = inject(PLATFORM_ID);

  constructor(private router:Router, private authService:AuthenService) {
    this.user = {...this.user}; //(spread operator)
  }

  redirectTo() {
    this.router.navigateByUrl("inscription");
  }

  login() {
    this.submitted = true;
    this.authService.signIn(this.user).subscribe({
      next: (result) => {
        // this.saveToken(result.data.login.token);
        // console.log("test new solution " + this.authService.isAuthenticated());
        // this.isAuthenticated();
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  // isAuthenticated: boolean {
  //   const isBrowser = isPlatformBrowser(this.platformId);
  //   console.log("isPlatformBrowser:", isBrowser);
  //   if(isBrowser) {
  //     this.authService.isLoggedInStatus = isBrowser;
  //     const authStatus = localStorage.getItem(this.authService.isLoggedInKey)!==null;
  //     console.log("Auth status:", authStatus);
  //     return authStatus;
  //   }
  //   return false;
  // }

}
