import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Client } from '../../domain/Client';
import { BehaviorSubject } from 'rxjs';
import { error } from 'console';
import { HttpLink } from 'apollo-angular/http';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  clients?:any;
  private clientsSubject = new BehaviorSubject<any[]>([]);
  clientsStatus: boolean=false;
  client$ = this.clientsSubject.asObservable();

  constructor(private apollo: Apollo) {}

  getAllClient() : any{
      this.apollo.use("client").watchQuery({
        query: gql`
        query {
          getListClient {
            email
            id
            nom
            password
            prenom
            telephone
          }
        }
        `
      }).valueChanges.subscribe(
        {
          next: (result: any) => {
            this.clientsSubject.next(result.data.getListClient);
          },
          error: (error: any) => {
            console.error('Erreur lors de la récupération des clients', error);
          }
        }
      )
  };

  addClient(dataClient: any){
    this.apollo.use("client").mutate({
      mutation: gql`
      mutation($nom: String!, $prenom: String!, $email: String!, $telephone: String!, $password: String!){
        addClient(
        clientDto: {nom: $nom, prenom: $prenom, email: $email, telephone: $telephone, password: $password}) {
          nom
          prenom
          email
          telephone
          password
        }
      }`,
      variables: {
        nom: dataClient.nom,
        prenom: dataClient.prenom,
        email: dataClient.email,
        telephone: dataClient.telephone,
        password: dataClient.password
      }
    }).subscribe((result: any) => {
      console.log(result);
    })
  };

  updateClient(dataClient: any){
    this.apollo.use("client").mutate({
      mutation: gql`
      mutation($id: ID!, $nom: String!, $prenom: String!, $email: String!, $telephone: String!, $password: String!){
        updateClient(
          clientDto: {id: $id, nom: $nom, prenom: $prenom, email: $email, telephone: $telephone, password: $password}) {
            nom
            prenom
            email
            telephone
            password
          }
      }`,
      variables: {
        id: dataClient.id,
        nom: dataClient.nom,
        prenom: dataClient.prenom,
        email: dataClient.email,
        telephone: dataClient.telephone,
        password: dataClient.password
      }
    }).subscribe((result: any) => {
      console.log(result);
    })
  };

  deleteClient(idClient:number){
    this.apollo.use("client").mutate({
      mutation: gql`
      mutation($id: ID!){
        deleteClientById(id: $id)
      }
      `,
      variables: {
        id: idClient
      }
    }).subscribe(
      {
        next: (result: any) => {
          this.clientsStatus=result.data.deleteClientById;
        },
        error: (error: any) => {
          console.error('Erreur lors de la récupération des clients', error);
        }
    });
  }



  getclientById(idClient: number){
    this.apollo.use("client").watchQuery({
      query: gql`
        query($id: Int) {
          getClientById(id: $id) {
            id
            email
          }
        }
      `,
      variables: {
        id: idClient
      }
    }).valueChanges.subscribe((result: any) => {
      const clientTest = result.data.getClientById;
    });
  }
}
