import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {

   private userService = inject(UserService)
    private router = inject(Router)
  
    username = ""
    password = ""
    message = ""
  
    login(){
      this.userService.loginAdmin(this.username, this.password).subscribe(data=>{
        if(data){
          this.message = ""
          localStorage.setItem("loggedUser", data.korIme)
          this.router.navigate(["administrator"])
        }
        else{
          this.message = "Pogresno korisnicko ime ili lozinka"
        }
      })
    }
}

