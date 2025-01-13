import { Component, Inject, inject, OnInit, PLATFORM_ID, } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HomeComponent } from './client/pages/home/home.component';
import { DashboardComponent } from './admin/pages/dashboard/dashboard.component';
import { PrimeNGConfig } from 'primeng/api';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { AuthenService } from './service/Authen/authen.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [AuthenService]
})
export class AppComponent implements OnInit {
  title = 'ecom-frontend';
  pathUrl!:string;
  isLoading:boolean = true;
  constructor(@Inject(PLATFORM_ID) private platformId: object, private route:Router, private primengConfig: PrimeNGConfig, private authService: AuthenService){
  }
  ngOnInit(){
    this.isLoading = false;
    this.primengConfig.ripple = false;
    if(isPlatformBrowser(this.platformId)){
      if(!this.authService.checkLoginStatus()){
        this.route.navigate(['/connexion']);
      }
    }
  }
}
/*
@if(!checkRoute()){
  <app-home></app-home>
}@else{

}
*/
