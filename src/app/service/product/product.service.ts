import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject, firstValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products?:any;
  private productSubject = new BehaviorSubject<any[]>([]);
  productsStatus: boolean=false;
  product$ = this.productSubject.asObservable();


  constructor(private apollo: Apollo) { }

  getAllProduct() : any{
    this.apollo.use("product").watchQuery({
      query: gql`
      query{
        getAllProduct {
          id
          nom
          marque
          prix
          qteStock
        }
      }
      `
    }).valueChanges.subscribe(
      {
        next: (result: any) => {
          this.productSubject.next(result.data.getAllProduct);
        },
        error: (error: any) => {
          console.error('Erreur lors de la récupération des clients', error);
        }
      }
    )
  }
  addProduct(dataProduct: any){
    this.apollo.use("product").mutate({
      mutation: gql`
        mutation($marque: String!, $nom: String!, $prix: Float!, $qteStock: Int!){
          addProduit(produitDto: {marque: $marque, nom: $nom, prix: $prix, qteStock: $qteStock}) {
            id
            marque
            prix
            nom
            qteStock
          }
        }
      `,variables: {
        marque: dataProduct.marque,
        nom: dataProduct.nom,
        prix: dataProduct.prix,
        qteStock: dataProduct.qteStock
      }
    }).subscribe((result: any) => {
      console.log(result);
    })
  }

  updateProduct(dataProduct: any){
    this.apollo.use("product").mutate({
      mutation: gql`
        mutation($id: ID!, $marque: String!, $nom: String!, $prix: Float!, $qteStock: Int!){
          updateProduct(
            produitDto: {id: $id, marque: $marque, nom: $nom, prix: $prix, qteStock: $qteStock}) {
              id
              marque
              prix
              nom
              qteStock
            }
        }`,
      variables: {
        id: dataProduct.id,
        marque: dataProduct.marque,
        nom: dataProduct.nom,
        prix: dataProduct.prix,
        qteStock: dataProduct.qteStock
      }
    }).subscribe((result: any) => {
      console.log(result);
    })
  };

  deleteProductById(idProduct:number){
    this.apollo.use("product").mutate({
      mutation: gql`
      mutation($id: ID!){
        deleteProductById(id: $id)
      }
      `,
      variables: {
        id: idProduct
      }
    }).subscribe(
      {
        next: (result: any) => {
          this.productsStatus=result.data.deleteProductById;
        },
        error: (error: any) => {
          console.error('Erreur lors de la récupération des clients', error);
        }
    });
  }

  getclientById(idProduct: number){
    this.apollo.use("product").watchQuery({
      query: gql`
        query($id: Int) {
          getProductById(id: $id) {
            id
            nom
            marque
            prix
            qteStock
          }
        }
      `,
      variables: { id: idProduct }
    }).valueChanges.subscribe((result: any) => {
      const clientTest = result.data.getClientById;
    });
  }
}
