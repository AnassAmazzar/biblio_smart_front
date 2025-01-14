import { Component, NgModule } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'primeng/fileupload';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { Vente } from '../../../domain/Vente';
import { provideAnimations } from '@angular/platform-browser/animations';
import { VenteService } from '../../../service/vente/vente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crud-vente',
  standalone: true,
  imports: [TableModule, DialogModule, RippleModule, ButtonModule, ToastModule, ToolbarModule, ConfirmDialogModule, InputTextModule, InputTextareaModule, CommonModule, FileUploadModule, DropdownModule, TagModule, RadioButtonModule, RatingModule, InputTextModule, FormsModule, InputNumberModule, FormsModule],
  templateUrl: './crud-vente.component.html',
  styleUrl: './crud-vente.component.scss',
  providers: [MessageService, ConfirmationService, NgModule, provideAnimations()]
})
export class CrudVenteComponent {
    venteDialog: boolean = false; //

    ventes!: any[];

    vente!: any;

    selectedvente!: any[] | null;

    submitted: boolean = false;

    statuses!: any[];

    constructor(private messageService: MessageService, private confirmationService: ConfirmationService, private venteService:VenteService, private routes: Router) {
      this.venteService.vente$.subscribe(v=>{this.ventes = v;});
    }
    ngOnInit() {
      this.venteService.getAllVentes();
    }

    openNew() {
        this.vente = {};
        this.submitted = false;
        this.venteDialog = true;
    }

    deleteSelectedventes() {
      // this.confirmationService.confirm({
      //     message: 'Are you sure you want to delete the selected ventes?',
      //     header: 'Confirm',
      //     icon: 'pi pi-exclamation-triangle',
      //     accept: () => {
      //         this.clients = this.clients.filter((val) => !this.selectedClient?.includes(val));
      //         this.selectedClient = null;
      //         this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'ventes Deleted', life: 3000 });
      //     }
      // });
    }

    editvente(vente: Vente) {
        this.vente = { ...vente };
        this.venteDialog = true;
    }

     deleteVente(vente: Vente) {
    
         this.venteService.deleteVenteById(vente.id);
         console.log("vente id   "+ vente.id );
         if(this.venteService.ventesStatus){
           this.confirmationService.confirm({
               message: 'Are you sure you want to delete ' + vente.id + '?',
               header: 'Confirm',
               icon: 'pi pi-exclamation-triangle',
               accept: () => {
                 this.ventes = this.ventes.filter((val) => val.id !== vente.id);
                 this.vente = {};
                 this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Vente Deleted', life: 3000 });
               }
           });
         }
       }

    hideDialog() {
        this.venteDialog = false;
        this.submitted = false;
    }

    // saveVente() {
    //   console.log('saveVente() method called');
    //   this.submitted = true;
    //   if (this.vente.nom?.trim()) {
    //     if (this.vente.id) {
    //       console.log(this.vente.id);
    //         this.venteService.updateVente(this.vente);
    //         this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'vente Updated', life: 3000 });
    //         // this.routes.navigateByUrl("admin/crud-vente");
    //     } else {
    //       console.log(this.vente);
    //         this.venteService.addVente(this.vente);
    //         this.venteService.vente$.subscribe(p=>{this.ventes = p;});
    //         this.venteDialog = false;
    //         this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'vente Created', life: 3000 });
            
    //       }
    //     }
    // }


  // save methode

  saveVente() {
    console.log('saveVente() method called');
    this.submitted = true;
  
    if (!this.vente.idClient || !this.vente.produitId)  {
      console.warn('idClient and idProduit is required.');
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'idClient and idProduit is required.',
        life: 3000,
      });
      return;
    }
  
    if (this.vente.id) {
      // Update existing vente
      console.log('Updating vente with ID:', this.vente.id);
      this.venteService.updateVente(this.vente); // Method already subscribes internally
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'Vente Updated',
        life: 3000,
      });
      this.venteDialog = false;
    } else {
      // Add new vente
      console.log('Creating new vente:', this.vente);
      this.venteService.addVente(this.vente); // Method already subscribes internally
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'Vente Created',
        life: 3000,
      });
      this.venteDialog = false;
      this.venteService.getAllVentes();
    }
  }
  
  

    findIndexById(id: number): number | void {
        // let index = -1;
        // for (let i = 0; i < this.clients.length; i++) {
        //     if (this.clients[i].id === id) {
        //         index = i;
        //         break;
        //     }
        // }

        // return index;

    }

    createId(): string {
        let id = '';
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    getSeverity(status: string): "success" | "warning" | "danger"{
        switch (status) {
            case 'INSTOCK':
                return 'success';
            case 'LOWSTOCK':
                return 'warning';
            case 'OUTOFSTOCK':
                return 'danger';
        }
        return "warning";
    }
}
