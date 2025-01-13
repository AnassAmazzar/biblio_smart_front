import { Component } from '@angular/core';
import {MenubarModule} from 'primeng/menubar';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-menu-bar',
  standalone: true,
  imports: [MenubarModule],
  templateUrl: './menu-bar.component.html',
  styleUrl: './menu-bar.component.scss'
})
export class MenuBarComponent {
  items: MenuItem[] | undefined;
  itemsIcon: MenuItem[] | undefined;

    ngOnInit() {
        this.items = [
            {
                label:'Home',
                icon:'pi pi-fw pi-home'
            },
            {
                label:'About us',
                icon:'pi pi-fw pi-book'
            },
            {
                label:'Catalogue',
                icon:'pi pi-book'
            },
            {
                label:'Users',
                icon:'pi pi-fw pi-user',
                items:[
                    {
                        label:'Connexion',
                        icon:'pi pi-fw pi-sign-in',

                    },
                    {
                        label:'Inscription',
                        icon:'pi pi-fw pi-user-plus',

                    },
                    {
                        label:'Déconnexion',
                        icon:'pi pi-fw pi-sign-out',

                    },
                    // {
                    //     label:'Search',
                    //     icon:'pi pi-fw pi-users',
                    //     items:[
                    //     {
                    //         label:'Filter',
                    //         icon:'pi pi-fw pi-filter',
                    //         items:[
                    //             {
                    //                 label:'Print',
                    //                 icon:'pi pi-fw pi-print'
                    //             }
                    //         ]
                    //     },
                    //     {
                    //         icon:'pi pi-fw pi-bars',
                    //         label:'List'
                    //     }
                    //     ]
                    // }
                ]
            }
        ];
    }
}
