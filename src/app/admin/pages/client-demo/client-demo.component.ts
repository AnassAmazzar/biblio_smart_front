import { Component, OnInit } from '@angular/core';
import { Client } from '../../../domain/Client';
import { ClientService } from '../../../service/client/client.service';
import { TopBarComponent } from '../../components/top-bar/top-bar.component';
import { CrudClientComponent } from '../../components/crud-client/crud-client.component';

@Component({
  selector: 'app-client-demo',
  standalone: true,
  imports: [CrudClientComponent, TopBarComponent],
  templateUrl: './client-demo.component.html',
  styleUrl: './client-demo.component.scss'
})
export class ClientDemoComponent implements OnInit {
  clients: Client = {
    id: 1,
    nom: 'John',
    prenom: 'Doe',
    email: 'john.doe@example.com',
    telephone: '1234567890',
    password: '123456',
    role: 'User'
  };

  constructor(){}

  ngOnInit(): void {
    //this.clientService.afficherClient();
  }

}
