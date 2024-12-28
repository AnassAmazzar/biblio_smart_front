import { Component, inject, NgModule } from '@angular/core';
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
import { Client } from '../../../domain/Client';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ClientService } from '../../../service/client/client.service';

@Component({
  selector: 'app-crud-client',
  standalone: true,
  imports: [TableModule, DialogModule, RippleModule, ButtonModule, ToastModule, ToolbarModule, ConfirmDialogModule, InputTextModule, InputTextareaModule, CommonModule, FileUploadModule, DropdownModule, TagModule, RadioButtonModule, RatingModule, InputTextModule, FormsModule, InputNumberModule, FormsModule],
  templateUrl: './crud-client.component.html',
  styleUrl: './crud-client.component.scss',
  providers: [MessageService, ConfirmationService, NgModule, provideAnimations()]
})
export class CrudClientComponent {
  clientDialog: boolean = false; //

    clients!: Client[];

    client!: any;

    selectedClient!: any[] | null;

    submitted: boolean = false;

    statuses!: any[];

    constructor(private messageService: MessageService, private confirmationService: ConfirmationService, private clientService:ClientService) {
      this.clientService.client$.subscribe(c=>{this.clients = c;});
    }
    ngOnInit() {
      this.clientService.getAllClient();
    }

    openNew() {
        this.client = {};
        this.submitted = false;
        this.clientDialog = true;
    }

    deleteSelectedProducts() {
      // this.confirmationService.confirm({
      //     message: 'Are you sure you want to delete the selected products?',
      //     header: 'Confirm',
      //     icon: 'pi pi-exclamation-triangle',
      //     accept: () => {
      //         this.clients = this.clients.filter((val) => !this.selectedClient?.includes(val));
      //         this.selectedClient = null;
      //         this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
      //     }
      // });
    }

    editProduct(client: Client) {
        this.client = { ...client };
        this.clientDialog = true;
    }

    deleteProduct(client: Client) {
      this.clientService.deleteClient(client.id);
      if(this.clientService.clientsStatus){
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + client.nom + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
              this.clients = this.clients.filter((val) => val.id !== client.id);
              this.client = {};
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
            }
        });
      }
    }

    hideDialog() {
        this.clientDialog = false;
        this.submitted = false;
    }

    saveProduct() {
        this.submitted = true;

        console.log(this.client.id);
        if (this.client.nom?.trim()) {
            if (this.client.id) {
                this.clientService.updateClient(this.client);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
            } else {
                // this.client.id = this.createId();
                // this.product.image = 'product-placeholder.svg';
                // this.products.push(this.product);
                //console.log(this.client);
                this.clientService.addClient(this.client);
                this.client = {};
                this.clients = [...this.clients];
                this.clientDialog = false;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
              }

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
