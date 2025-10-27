import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-vlasnik',
  standalone: true,
  imports: [FormsModule, RouterOutlet, RouterModule],
  templateUrl: './vlasnik.component.html',
  styleUrl: './vlasnik.component.css'
})
export class VlasnikComponent {

  private router = inject(Router)
  odjava(){
    localStorage.removeItem("loggedUser")
    this.router.navigate([""])
  }
}
