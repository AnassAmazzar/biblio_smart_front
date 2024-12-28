import { Component, OnInit } from '@angular/core';
import { TopBarComponent } from '../../components/top-bar/top-bar.component';
//import { SideBarComponent } from '../../components/side-bar/side-bar.component';
import { ClientDemoComponent } from '../client-demo/client-demo.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TopBarComponent, ClientDemoComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{
  constructor(){}

  ngOnInit(): void {
  }

}
