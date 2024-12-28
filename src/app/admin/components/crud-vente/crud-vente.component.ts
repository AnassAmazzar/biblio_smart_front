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
      this.venteService.vente$.subscribe(p=>{this.ventes = p;});
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

    }

    hideDialog() {
        this.venteDialog = false;
        this.submitted = false;
    }

    saveVente() {
      this.submitted = true;
      if (this.vente.nom?.trim()) {
        if (this.vente.id) {
            this.venteService.updateVente(this.vente);
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'vente Updated', life: 3000 });
            this.routes.navigateByUrl("admin/crud-vente");
        } else {
            this.venteService.addVente(this.vente);
            this.venteService.vente$.subscribe(p=>{this.ventes = p;});
            this.venteDialog = false;
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'vente Created', life: 3000 });
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
