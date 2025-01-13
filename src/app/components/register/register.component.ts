import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Router } from '@angular/router';
import { Client } from '../../domain/Client';
import { AuthenService } from '../../service/Authen/authen.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [DividerModule, ButtonModule, InputTextModule, FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  providers: []
})
export class RegisterComponent {
  //OnInit
  client!: Client;
  roles: any[] | undefined;
  tokenKey: any | undefined;
  selectedRole: any | undefined;
  submitted: boolean = false;

  constructor(private router:Router, private authService:AuthenService) {
    this.client = {...this.client}; //(spread operator)
    this.roles = [ "User", "Auteur", "Admin" ];
  }
  // client: any | undefined;

  redirectTo(){
    this.router.navigateByUrl("connexion");
  }

  // ngOnInit() {}

  register(){
    let token: any;
    this.submitted = true;
    console.log(this.client);
    this.authService.signUp(this.client).subscribe({
      next: (result) => {
        // Ici vous êtes sûr d'avoir le token
        this.redirectTo();
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  getToken(token : any){
    this.tokenKey = token;
    console.log("tokenKey" + this.tokenKey.token);
  }


}
