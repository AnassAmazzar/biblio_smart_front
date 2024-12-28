import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VenteService {
    ventes?:any;
    private venteSubject = new BehaviorSubject<any[]>([]);
    ventesStatus: boolean=false;
    vente$ = this.venteSubject.asObservable();

  constructor(private apollo: Apollo) { }


  getAllVentes(): any{

  }

  addVente(dataProduct: any){

  }

  updateVente(dataProduct: any){

  };

  deleteVenteById(idProduct:number){

  }

  getclientById(idProduct: number){

  }
}
