import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-turista',
  standalone: true,
  imports: [FormsModule, RouterOutlet, RouterModule],
  templateUrl: './turista.component.html',
  styleUrl: './turista.component.css'
})
export class TuristaComponent implements OnInit {

  user: User = new User()
  private userSerivce = inject(UserService)
  router = inject(Router)
  ngOnInit(): void {
    let u = localStorage.getItem("loggedUser")
    if(u){
      this.userSerivce.getUser(u).subscribe(data=>{
        if(data.body)
          this.user = data.body
      })
    }
  }

  odjava(){
    localStorage.removeItem("loggedUser")
    this.router.navigate([""])
  }

}
