import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-promeni-lozniku',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './promeni-lozniku.component.html',
  styleUrl: './promeni-lozniku.component.css'
})
export class PromeniLoznikuComponent {

    korIme = ""
    lozinka = ""
    message = ""
    nova1 = ""
    nova2 = ""
    private userSerivce = inject(UserService)
    private router = inject(Router)

    promeni(){
      this.userSerivce.login(this.korIme,this.lozinka).subscribe(data=>{
        if(data){
          this,this.message = ""
        } else {
          this.message = "Pogresno korisnicko ime ili lozinka"
          return
        }
        if(this.nova1 != this.nova2){
          this.message = "Nisu iste nove lozinke"
          return
        }
        this.userSerivce.login(this.korIme, this.nova1).subscribe(data1=>{
          if(data1){
            this.message = "Ne mozes da promenis na istu lozinku"
            return
          } else {
            const passwordRegex = /(?=.*[A-Z])(?=(?:.*[a-z]){3,})(?=.*[0-9])(?=.*[^A-Za-z0-9])^[A-Za-z].{5,9}$/
            if(!passwordRegex.test(this.nova1)){
              this.message = "Neispravan format lozinke"
              return
            }
            this.userSerivce.promeniLozinku(data.korIme, this.nova1).subscribe(data=>{
              alert(data.message)
              this.router.navigate([""])
            })
          }
        })

      })
    }

}
