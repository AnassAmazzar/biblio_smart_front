import { Component } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import { RippleModule } from 'primeng/ripple';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [AvatarModule, ToolbarModule, SideBarComponent],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss'
})
export class TopBarComponent {

  constructor(private routes:Router) { }


  onRoute(routesStr : string) {
    console.log(routesStr);
    switch(routesStr) {
      case "crud-client":
        this.routes.navigateByUrl("admin/crud-client");
        break;
      case "crud-product":
        this.routes.navigateByUrl("admin/crud-product");
        break;
    }
  }

}
