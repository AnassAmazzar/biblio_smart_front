import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Client } from '../../domain/Client';
import { User } from '../../domain/User';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthenService {
  token?: any[];
  isLoggedInKey: string = 'isLoggedIn';
  isRoleKey: string = 'roleUser';
  isLoggedInStatus!: boolean;
  isRoleStatus!: boolean;
  isRole!: string;

  private tokenKeySubject = new BehaviorSubject<any[]>([]);
  tokenKey$ = this.tokenKeySubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: object, private apollo: Apollo) {}

  checkLoginStatus(): boolean {
    if(isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem(this.isLoggedInKey);
      this.isLoggedInStatus = !!token; // Met à jour le statut
    }
    return this.isLoggedInStatus;
  }

  checkRole(): string{
    this.isRole='';
    if(isPlatformBrowser(this.platformId)) {
      const role = localStorage.getItem(this.isRoleKey);
      console.log('auth service : ' + role);
      return role || 'null';
    }
    return 'null';
  }

  // checkRoleAdmin(): boolean{
  //   if(isPlatformBrowser(this.platformId)) {
  //     const role = localStorage.getItem(this.isRoleKey);
  //     if(role==='Admin'){
  //       console.log("User is " + role);
  //       this.isRoleStatus = !!role;
  //       return this.isRoleStatus;
  //     }
  //   }
  //   return false;
  // }
  // checkRoleAuteur(): boolean{
  //   if(isPlatformBrowser(this.platformId)) {
  //     const role = localStorage.getItem(this.isRoleKey);
  //     if(role==='Auteur'){
  //       console.log("User is " + role);
  //       this.isRoleStatus = !!role;
  //       return this.isRoleStatus;
  //     }
  //   }
  //   return false;
  // }
  // checkRoleClient(): boolean{
  //   if(isPlatformBrowser(this.platformId)) {
  //     const role = localStorage.getItem(this.isRoleKey);
  //     if(role==='User'){
  //       console.log("User is " + role);
  //       this.isRoleStatus = !!role;
  //       return this.isRoleStatus;
  //     }
  //   }
  //   return false;
  // }

  signUp(user: Client): Observable<any>{
    return this.apollo.use('authentification').mutate({
      mutation: gql`
      mutation ($nom: String!, $prenom: String, $email: String, $password: String, $telephone: String, $role: String) {
          register( registerRequest : {nom:$nom, prenom: $prenom, email: $email, password: $password, telephone: $telephone, role: $role}) {
            token
          }
        }
      `, variables : {
          nom: user.nom,
          prenom: user.prenom,
          email: user.email,
          password: user.password,
          telephone: user.telephone,
          role: user.role
      }
    }).pipe(
      tap((res: any) => {
        console.log("teste role, token : " + res.data.register);
        this.tokenKeySubject.next(res.data.register);
      })
    )
  }


  signIn(user: User): Observable<any> {
    return this.apollo.use('authentification').query({
      query: gql`
      query ($email: String, $password: String) {
          login( authenticationRequest : {email: $email, password: $password}) {
            token
            role
          }
        }
      `, variables : {
          email: user.email,
          password: user.password
      }
    }).pipe(
      tap((res: any) => {
        this.saveToken(res.data.login.token);
        this.saveRole(res.data.login.role);
        this.tokenKeySubject.next(res.data.login);
      })
    )
  }
  saveToken(token : string) {
    if(isPlatformBrowser(this.platformId)){
      localStorage.setItem(this.isLoggedInKey, token);
      this.isLoggedInStatus = true;
    }
  }

  saveRole(role: string) {
    if(isPlatformBrowser(this.platformId)){
      localStorage.setItem(this.isRoleKey, role);
      this.isRoleStatus = true;
    }
  }


}
