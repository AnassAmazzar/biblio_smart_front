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
import { Product } from '../../../domain/Product';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ProductService } from '../../../service/product/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crud-product',
  standalone: true,
  imports: [TableModule, DialogModule, RippleModule, ButtonModule, ToastModule, ToolbarModule, ConfirmDialogModule, InputTextModule, InputTextareaModule, CommonModule, FileUploadModule, DropdownModule, TagModule, RadioButtonModule, RatingModule, InputTextModule, FormsModule, InputNumberModule, FormsModule],
  templateUrl: './crud-product.component.html',
  styleUrl: './crud-product.component.scss',
  providers: [MessageService, ConfirmationService, NgModule, provideAnimations()]
})
export class CrudProductComponent {
    productDialog: boolean = false; //

    products!: any[];

    product!: any;

    selectedProduct!: any[] | null;

    submitted: boolean = false;

    statuses!: any[];

    constructor(private messageService: MessageService, private confirmationService: ConfirmationService, private productService:ProductService, private routes: Router) {
      this.productService.product$.subscribe(p=>{this.products = p;});
    }
    ngOnInit() {
      this.productService.getAllProduct();
    }

    openNew() {
        this.product = {};
        this.submitted = false;
        this.productDialog = true;
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

    editProduct(product: Product) {
        this.product = { ...product };
        this.productDialog = true;
    }

    deleteProduct(product: Product) {
      this.productService.deleteProductById(product.id);
      if(this.productService.productsStatus){
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + product.nom + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
              this.products = this.products.filter((val) => val.id !== product.id);
              this.product = {};
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
            }
        });
      }
    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }

    saveProduct() {
      this.submitted = true;
      if (this.product.nom?.trim()) {
        if (this.product.id) {
            this.productService.updateProduct(this.product);
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
            this.routes.navigateByUrl("admin/crud-product");
        } else {
            this.productService.addProduct(this.product);
            this.productService.product$.subscribe(p=>{this.products = p;});
            this.productDialog = false;
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
