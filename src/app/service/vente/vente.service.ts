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

    this.apollo.use("vente").watchQuery({
      query: gql`
      query {
        getListVente {
          id 
          idClient 
          produitId 
          dateVente 
          quantitie
        }
      }
      `
    }).valueChanges.subscribe(
      {
        next: (result: any) => {
          this.venteSubject.next(result.data.getListVente);
        },
        error: (error: any) => {
          console.error('Erreur lors de la récupération des ventes', error);
        }
      }
    )

  }

  addVente(dataVente: any){
    this.apollo.use("vente").mutate({
      mutation: gql`
      mutation($idClient: Int!, $produitId: Int!, $dateVente: String!, $quantitie: Int!){
        addVente(
        venteDto: {idClient: $idClient, produitId: $produitId, dateVente: $dateVente, quantitie: $quantitie}) {
          id
          idClient
          produitId
          dateVente
          quantitie
        }
      }`,
      variables: {
        idClient: dataVente.idClient,
        produitId: dataVente.produitId,
        dateVente: dataVente.dateVente,
        quantitie: dataVente.quantitie
      }
    }).subscribe({
      next: (result: any) => {
          console.log('Vente ajoutée avec succès:', result.data.addVente);
          // Optionnel : mettre à jour la liste des ventes localement
          this.getAllVentes(); 
      },
      error: (error: any) => {
          console.error('Erreur lors de l’ajout de la vente:', error);
      }
  })

  };

  updateVente(dataVente: any){

    this.apollo.use("vente").mutate({
      mutation: gql`
      mutation($id : ID!, $idClient: Int!, $produitId: Int!, $dateVente: String!, $quantitie: Int!){
        updateVente(
        venteDto: {id : $id, idClient: $idClient, produitId: $produitId, dateVente: $dateVente, quantitie: $quantitie}) {
          id
          idClient
          produitId
          dateVente
          quantitie
        }
      }`,
      variables: {
        id : dataVente.id,
        idClient: dataVente.idClient,
        produitId: dataVente.produitId,
        dateVente: dataVente.dateVente,
        quantitie: dataVente.quantitie
      }
    }).subscribe({
      next: (result: any) => {
          console.log('Vente modifiée avec succès:', result.data.updateVente);
          // Optionnel : mettre à jour la liste des ventes localement
          this.getAllVentes(); 
      },
      error: (error: any) => {
          console.error('Erreur lors de la modification de vente:', error);
      }
  })
  };

  deleteVenteById(idVente:number){
    this.apollo.use("vente").mutate({
      mutation: gql`
      mutation($id: ID!){
        deleteVenteById(id: $id)
      }
      `,
      variables: {
        id: idVente
      }
    }).subscribe(
      {
        next: (result: any) => {
          this.ventesStatus=result.data.deleteVenteById;
        },
        error: (error: any) => {
          console.error('Erreur lors de la récupération des ventes', error);
        }
    });
  }

  


  // deleteVenteById(produitId:number, idClient:number){

  //   this.apollo.use("vente").mutate({
  //     mutation: gql`
  //     mutation($idClient: Int!, $produitId: Int!){
  //       deleteVenteById(idClient : $idClient, produitId : $produitId)
  //     }
  //     `,
  //     variables: {
  //       idClient: idClient,
  //       produitId : produitId
  //     }
  //   }).subscribe(
  //     {
  //       next: (result: any) => {
  //         this.ventesStatus=result.data.deleteVenteById;
  //       },
  //       error: (error: any) => {
  //         console.error('Erreur lors de la récupération des ventes', error);
  //       }
  //   });


  // }

  getVenteById(idProduct: number){

  }
}
